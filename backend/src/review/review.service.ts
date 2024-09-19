import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ReviewDto } from './dto/review.dto';
import { returnReviewObject } from './return-review.object';
import { uuidGen } from 'src/utils/uuidGenerator';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const response = await this.prisma.review.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      select: returnReviewObject,
    });

    return response;
  }

  async createReview(userUuid: string, dto: ReviewDto, productUuid: string) {
    const response = await this.prisma.review.create({
      data: {
        uuid: uuidGen(),
        rating: Math.floor(dto.rating),
        text: dto.text,
        product: {
          connect: {
            uuid: productUuid,
          },
        },
        user: {
          connect: {
            uuid: userUuid,
          },
        },
      },
      select: returnReviewObject,
    });

    return response;
  }

  async getAverageValueByProductId(productUuid: string) {
    return await this.prisma.review
      .aggregate({
        where: {
          productUuid,
        },
        _avg: { rating: true },
      })
      .then((data) => data._avg);
  }

  async deleteReview(uuid: string) {
    try {
      const result = await this.prisma.review.delete({
        where: {
          uuid,
        },
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
