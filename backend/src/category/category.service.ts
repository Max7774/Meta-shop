import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CategoryDto } from './dto/category.dto';
import { returnCategoryObject } from './return-category.object';
import { convertToSlug } from 'src/utils/convertToSlug';
import { uuidGen } from 'src/utils/uuidGenerator';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async byId(uuid: string) {
    const category = await this.prisma.category.findUnique({
      where: {
        uuid,
      },
      select: returnCategoryObject,
    });

    if (!category) {
      throw new Error('Category not found');
    }

    return category;
  }

  async bySlug(slug: string) {
    const category = await this.prisma.category.findUnique({
      where: {
        slug,
      },
      select: returnCategoryObject,
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async getAll() {
    return await this.prisma.category.findMany({
      select: returnCategoryObject,
    });
  }

  async createCategory(dto: CategoryDto) {
    const category = await this.prisma.category.create({
      data: {
        uuid: uuidGen(),
        name: dto.category_name,
        slug: convertToSlug(dto.category_name),
      },
    });

    const subcategory = await this.prisma.subcategory.create({
      data: {
        uuid: uuidGen(),
        name: dto.subcategory_name,
        slug: convertToSlug(dto.subcategory_name),
        categoryUuid: category.uuid,
      },
    });

    return {
      category,
      subcategory,
    };
  }

  async updateCategory(uuid: string, dto: CategoryDto) {
    return await this.prisma.category.update({
      where: {
        uuid,
      },
      data: {
        name: dto.category_name,
        slug: convertToSlug(dto.category_name),
      },
    });
  }

  async deleteCategory(uuid: string) {
    return await this.prisma.category.delete({
      where: {
        uuid,
      },
    });
  }
}
