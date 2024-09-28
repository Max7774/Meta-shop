import { BadGatewayException, Injectable } from '@nestjs/common';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { PrismaService } from 'src/prisma.service';
import { uuidGen } from 'src/utils/uuidGenerator';
import { convertToSlug } from 'src/utils/convertToSlug';
import { returnSubcategoryObject } from './returnSubcategoryObject';

@Injectable()
export class SubcategoryService {
  constructor(private prisma: PrismaService) {}

  async byId(uuid: string) {
    const subcategory = await this.prisma.subcategory.findUnique({
      where: {
        uuid,
      },
      select: returnSubcategoryObject,
    });

    if (!subcategory) {
      throw new Error('Subcategory not found');
    }

    return subcategory;
  }

  async create(createSubcategoryDto: CreateSubcategoryDto) {
    try {
      return await this.prisma.subcategory.create({
        data: {
          uuid: uuidGen(),
          name: createSubcategoryDto.name,
          slug: convertToSlug(createSubcategoryDto.name),
          category: {
            connect: {
              uuid: createSubcategoryDto.categoryUuid,
            },
          },
        },
      });
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async findAll(categoryUuid: string) {
    try {
      const subcategories = await this.prisma.subcategory.findMany({
        where: {
          category: {
            uuid: categoryUuid,
          },
        },
        select: returnSubcategoryObject,
      });

      return {
        categoryUuid,
        subcategories,
      };
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async remove(uuid: string) {
    try {
      const deletedSubcategory = await this.prisma.$transaction(
        async (prisma) => {
          await this.prisma.product.deleteMany({
            where: {
              subcategoryUuid: uuid,
            },
          });

          const subcategory = await prisma.subcategory.delete({
            where: {
              uuid,
            },
            select: { ...returnSubcategoryObject, categoryUuid: true },
          });

          return subcategory;
        },
      );

      return deletedSubcategory;
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
}
