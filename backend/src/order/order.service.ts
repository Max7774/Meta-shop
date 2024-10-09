import {
  BadGatewayException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { productReturnObject } from 'src/product/return-product.object';
import { OrderDto } from './dto/order.dto';
import { PaymentStatusDto } from './dto/payment-status.dto';
import { uuidGen } from 'src/utils/uuidGenerator';
import {
  EnumOrderItemStatus,
  Order,
  OrderItem,
  Prisma,
  Product,
} from '@prisma/client';
import { QRCodeService } from 'src/qrcode/qrcode.service';
import * as PDFDocument from 'pdfkit';
import { join } from 'path';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { unitofmeasurementData } from 'src/utils/unitofmeasurementData';
import { Decimal } from '@prisma/client/runtime/library';
import { createTransport } from 'nodemailer';
import { BotService } from 'src/bot/bot.service';

@Injectable()
export class OrderService {
  private transporter;

  constructor(
    private prisma: PrismaService,
    private qr: QRCodeService,
    private bot: BotService,
  ) {
    this.transporter = createTransport({
      pool: true,
      host: 'smtp.mail.ru',
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAILDEV_INCOMING_USER,
        pass: process.env.MAILDEV_INCOMING_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  private getSearchTermFilter(searchTerm = ''): Prisma.OrderWhereInput {
    return {
      OR: [
        {
          orderId: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
        {
          user: {
            phone_number: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        },
      ],
    };
  }

  private getStatusFilter(status: EnumOrderItemStatus): Prisma.OrderWhereInput {
    return {
      status,
    };
  }

  private createFilter(params: {
    searchTerm: string;
    status?: EnumOrderItemStatus;
  }): Prisma.OrderWhereInput {
    const filters: Prisma.OrderWhereInput[] = [];

    if (params.searchTerm) {
      filters.push(this.getSearchTermFilter(params.searchTerm));
    }
    if (params.status) {
      filters.push(this.getStatusFilter(params.status));
    }

    return filters.length ? { AND: filters } : {};
  }

  async getAll(
    userUuid: string,
    params: { searchTerm: string; status?: EnumOrderItemStatus },
  ) {
    const { role } = await this.prisma.user.findUnique({
      where: {
        uuid: userUuid,
      },
    });
    const filters = this.createFilter(params);

    if (!params.status) {
      filters.status = {
        notIn: [EnumOrderItemStatus.Delivered, EnumOrderItemStatus.Canceled],
      };
    }

    if (role === 'ADMIN') {
      return await this.prisma.order.findMany({
        where: filters,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          user: {
            select: {
              uuid: true,
              first_name: true,
              second_name: true,
              email: true,
              currentAddress: true,
              avatarPath: true,
              phone_number: true,
            },
          },
          address: true,
          items: {
            include: {
              product: {
                select: productReturnObject,
              },
            },
          },
        },
      });
    } else {
      return await this.prisma.order.findMany({
        where: {
          ...filters,
          userUuid,
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          address: true,
          items: {
            include: {
              product: {
                select: productReturnObject,
              },
            },
          },
        },
      });
    }
  }

  async getByUserId(userUuid: string) {
    return this.prisma.order.findMany({
      where: {
        userUuid,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        items: {
          include: {
            product: {
              select: productReturnObject,
            },
          },
        },
      },
    });
  }

  async placeOrder(dto: OrderDto, userUuid: string) {
    const total = dto.items.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);

    const productsInStock = Promise.all(
      dto.items.map(async (element) => {
        const { inStock } = await this.prisma.product.findUnique({
          where: {
            uuid: element.productUuid,
          },
        });

        return {
          ...element,
          inStock,
        };
      }),
    );

    const items = await productsInStock;

    if (items.some((el) => !el.inStock)) {
      throw new BadGatewayException({
        itemsInStock: items.filter((el) => !el.inStock),
      });
    }

    const timestamp = Date.now().toString(36); // Преобразуем в 36-ричную систему для сокращения длины
    const randomNum = Math.floor(Math.random() * 1e6).toString(36);

    const order = await this.prisma.order.create({
      data: {
        uuid: uuidGen(),
        orderId: 'ORDER-' + timestamp + '-' + randomNum,
        status: dto.status,
        comment: dto.comment,
        items: {
          create: items.map((el) => {
            return {
              uuid: uuidGen(),
              ...el,
            };
          }),
        },
        isActual: false,
        isDelivery: total <= 7000 ? true : false,
        total: total <= 7000 ? total + 800 : total,
        user: {
          connect: {
            uuid: userUuid,
          },
        },
        address: {
          connect: {
            uuid: dto.addressUuid,
          },
        },
      },
      include: {
        address: true,
        items: {
          include: {
            product: {
              select: productReturnObject,
            },
          },
        },
        user: {
          select: {
            first_name: true,
            second_name: true,
            phone_number: true,
          },
        },
      },
    });

    await this.transporter.sendMail({
      from: process.env.MAILDEV_INCOMING_USER,
      to: process.env.MAILDEV_AUDIT_USER,
      subject: 'Новый заказ!',
      text: `Зарегистрирован новый заказ под номером:: ${order.orderId}!`,
    });

    await this.bot.sendOrderNotification(order);

    return order;
  }

  async actualizeOrder(items: OrderItem[], orderId: string) {
    try {
      for (const item of items) {
        await this.prisma.orderItem.update({
          where: {
            uuid: item.uuid,
          },
          data: {
            quantity: item.quantity,
            price: item.price,
          },
        });
      }

      const { uuid, isDelivery } = await this.prisma.order.findUnique({
        where: { orderId },
      });

      const updatedItems = await this.prisma.orderItem.findMany({
        where: { orderUuid: uuid },
      });

      // Вычисляем новую общую сумму заказа
      const totalDecimal = updatedItems.reduce((sum: Decimal, item) => {
        const priceDecimal = new Decimal(item.quantity); // Преобразуем price в Decimal
        const itemTotal = priceDecimal.mul(item.price); // price * quantity
        return sum.add(itemTotal); // Суммируем
      }, new Decimal(0));

      const totalInt = totalDecimal
        .toNearest(1, Decimal.ROUND_HALF_UP)
        .toNumber();

      const order = await this.prisma.order.update({
        where: { orderId },
        data: { total: isDelivery ? totalInt + 800 : totalInt, isActual: true },
        include: {
          address: true,
          items: {
            include: {
              product: {
                select: productReturnObject,
              },
            },
          },
        },
      });

      return order;
    } catch (error) {
      console.error('Error updating order items:', error);
    }
  }

  async updateStatus(dto: PaymentStatusDto) {
    const order = await this.prisma.order.update({
      where: {
        uuid: dto.orderUuid,
      },
      data: {
        status: dto.status,
      },
    });

    if (order.status === 'Payed') {
      const orderItems = await this.prisma.orderItem.findMany({
        where: {
          orderUuid: order.uuid,
        },
        include: {
          product: {
            select: productReturnObject,
          },
        },
      });
      await this.generatePdfReceipt(orderItems, order);
    }

    return { uuid: order.uuid, status: order.status };
  }

  async cancelOrder(orderUuid: string) {
    await this.prisma.order.update({
      where: {
        uuid: orderUuid,
      },
      data: {
        status: 'Canceled',
      },
    });

    return true;
  }

  private async generatePdfReceipt(
    orderItems: (OrderItem & { product: Product })[],
    order: Order,
  ) {
    // Путь к директории для сохранения чеков
    const receiptsDir = join(process.cwd(), 'receipts');

    // Проверяем, существует ли директория, и создаем ее при необходимости
    if (!existsSync(receiptsDir)) {
      mkdirSync(receiptsDir);
      console.log('Receipts directory created.');
    } else {
      console.log('Receipts directory already exists.');
    }

    const doc = new PDFDocument();

    // Путь к файлу шрифта
    const fontPath = join(process.cwd(), 'fonts', 'Roboto-Regular.ttf');

    // Регистрируем шрифт
    doc.registerFont('Roboto', fontPath);

    // Устанавливаем шрифт по умолчанию
    doc.font('Roboto');

    const filePath = join(receiptsDir, `receipt-${order.orderId}.pdf`);

    const writeStream = createWriteStream(filePath);
    doc.pipe(writeStream);

    doc.fontSize(20).text('Чек', { align: 'center' });

    doc.moveDown();

    doc.fontSize(12).text(`Номер заказа: ${order.orderId}`);
    doc.text(`Дата заказа: ${new Date(order.createdAt).toLocaleDateString()}`);
    doc.text(`Доставка: ${order.isDelivery ? '800' : '0'} тенге`);
    doc.text(`Общая сумма: ${order.total} тенге`);

    doc.moveDown();

    doc.text('Товары:');

    orderItems.forEach((item) => {
      doc.text(
        `- ${item.product.name} ${item.quantity}/${
          unitofmeasurementData[item.product.unitofmeasurement]
        } x ${item.price} тенге`,
      );
    });

    // Генерируем данные для QR-кода (например, ссылка на заказ)
    const qrData = `https://i-forvard.kz/order/${order.uuid}`;

    // Генерируем QR-код в формате Data URL
    const qrCodeDataURL = await this.qr.generateQRCode(qrData);

    // Преобразуем Data URL в буфер
    const qrImageBuffer = Buffer.from(qrCodeDataURL.split(',')[1], 'base64');

    // // Добавляем QR-код в PDF
    // doc.addPage();
    doc.moveDown();

    doc.fontSize(16).text('Сканируйте QR-код для просмотра заказа:', {
      align: 'center',
    });

    doc.moveDown();

    doc.image(qrImageBuffer, {
      fit: [150, 150],
      align: 'center',
      valign: 'center',
    });

    // Завершаем создание PDF и закрываем поток
    doc.end();

    // Ждем завершения записи файла
    return new Promise((resolve, reject) => {
      writeStream.on('finish', () => {
        resolve(true);
      });
      writeStream.on('error', (err) => {
        reject(err);
      });
    });
  }

  async getOrderById(orderId: string, userUuid: string) {
    const order = await this.prisma.order.findUnique({
      where: {
        orderId,
      },
      include: {
        items: {
          include: {
            product: {
              select: productReturnObject,
            },
          },
        },
        user: true,
        address: true,
      },
    });

    const currentUser = await this.prisma.user.findUnique({
      where: {
        uuid: userUuid,
      },
    });

    if (!order) {
      throw new HttpException('Order not found!', HttpStatus.NOT_FOUND);
    }

    if (order.userUuid !== currentUser.uuid && currentUser.role !== 'ADMIN') {
      throw new HttpException('Order not found!', HttpStatus.NOT_FOUND);
    }

    return order;
  }

  async deleteOrder(orderId: string) {
    try {
      const { uuid } = await this.prisma.order.findUnique({
        where: {
          orderId,
        },
      });
      const deletedOrder = await this.prisma.$transaction(async (prisma) => {
        await prisma.orderItem.deleteMany({
          where: {
            orderUuid: uuid,
          },
        });

        const order = await prisma.order.delete({
          where: {
            uuid,
          },
          include: {
            items: true,
          },
        });

        return order;
      });

      return deletedOrder;
    } catch (error) {
      throw new HttpException('Delete order error!', HttpStatus.BAD_REQUEST);
    }
  }
}
