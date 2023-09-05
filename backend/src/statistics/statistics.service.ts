import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class StatisticsService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async getMain() {
    const reviews = await this.prisma.review.findMany();

    const filteredReviews = reviews.filter((review) => review.rating > 4);

    const allUsers = await this.prisma.user.findMany();

    const totalOrders = await this.prisma.order.findMany({
      select: {
        total: true,
      },
    });

    const total = totalOrders.reduce(
      (accumulator, currentValue) => accumulator + currentValue.total,
      0,
    );

    return {
      allUsers,
      statistic: [
        {
          name: 'Положительных отзывов',
          value: filteredReviews.length,
        },
        {
          name: 'Всего отзывов',
          value: reviews.length,
        },
        {
          name: 'Всего товаров заказано',
          value: totalOrders.length,
        },
        {
          name: 'Общяя сумма выручки',
          value: total,
        },
      ],
    };
  }
}
