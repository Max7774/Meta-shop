import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { productReturnObject } from 'src/product/return-product.object';
import { OrderDto } from './dto/order.dto';
import * as YooKassa from 'yookassa';
import { PaymentStatusDto } from './dto/payment-status.dto';
import { EnumOrderItemStatus } from '@prisma/client';
import { uuidGen } from 'src/utils/uuidGenerator';

const yooKassa = new YooKassa({
  shopId: process.env['SHOP_ID'],
  secretKey: process.env['PAYMENT_TOKEN'],
});

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  getAll(userUuid: string) {
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

    for (let index = 0; index < dto.items.length; index++) {
      const quantityProduct = await this.prisma.product.findUnique({
        where: {
          uuid: dto.items[index].uuid,
        },
      });
      await this.prisma.product.update({
        where: {
          uuid: dto.items[index].uuid,
        },
        data: {
          quantity: quantityProduct.quantity - 1,
        },
      });
    }

    const order = await this.prisma.order.create({
      data: {
        uuid: uuidGen(),
        status: dto.status,
        items: {
          create: dto.items,
        },
        total,
        user: {
          connect: {
            uuid: userUuid,
          },
        },
      },
    });
    const payment = await yooKassa.createPayment({
      amount: {
        value: total.toFixed(2),
        currency: 'RUB',
      },
      payment_method_data: {
        type: 'bank_card',
      },
      confirmation: {
        type: 'redirect',
        return_url: `${process.env.CLIENT_URL}/thanks`,
      },
      description: `Order #${order.uuid}`,
    });

    return payment;
  }

  async updateStatus(dto: PaymentStatusDto) {
    if (dto.event === 'payment.waiting_for_capture') {
      const payment = await yooKassa.capturePayment(dto.object.id);
      return payment;
    }

    if (dto.event === 'payment.succeeded') {
      const orderId = Number(dto.object.description.split('#')[1]);

      await this.prisma.order.update({
        where: {
          uuid: String(orderId),
        },
        data: {
          status: EnumOrderItemStatus.Payed,
        },
      });

      return true;
    }

    return true;
  }
}
