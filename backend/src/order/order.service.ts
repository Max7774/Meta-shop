import { BadGatewayException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { productReturnObject } from 'src/product/return-product.object';
import { OrderDto, OrderItemDto } from './dto/order.dto';
import { PaymentStatusDto } from './dto/payment-status.dto';
import { uuidGen } from 'src/utils/uuidGenerator';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

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

  private createFilter(params: { searchTerm: string }): Prisma.OrderWhereInput {
    const filters: Prisma.OrderWhereInput[] = [];

    if (params.searchTerm)
      filters.push(this.getSearchTermFilter(params.searchTerm));

    return filters.length ? { AND: filters } : {};
  }

  async getAll(userUuid: string, params: { searchTerm: string }) {
    const { role } = await this.prisma.user.findUnique({
      where: {
        uuid: userUuid,
      },
    });
    const filters = this.createFilter(params);

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
        isDelivery: total <= 6000 ? true : false,
        total: total <= 6000 ? total + 800 : total,
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
    });

    return order;
  }

  async updateStatus(dto: PaymentStatusDto) {
    await this.prisma.order.update({
      where: {
        uuid: dto.orderUuid,
      },
      data: {
        status: dto.status,
      },
    });

    return { uuid: dto.orderUuid, status: dto.status };
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

  private async updateQuantityProduct(items: OrderItemDto[]) {
    for (let index = 0; index < items.length; index++) {
      const quantityProduct = await this.prisma.product.findUnique({
        where: {
          uuid: items[index].productUuid,
        },
      });
      await this.prisma.product.update({
        where: {
          uuid: items[index].productUuid,
        },
        data: {
          quantity: quantityProduct.quantity - 1,
        },
      });
    }
  }
}
