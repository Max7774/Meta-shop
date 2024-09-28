import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CategoryDto } from './dto/category.dto';
import {
  returnCategoryObject,
  returnAllCategoryObject,
} from './return-category.object';
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
    const categories = await this.prisma.category.findMany({
      select: returnAllCategoryObject,
    });

    return { categories };
  }

  async createCategory(dto: CategoryDto) {
    const category = await this.prisma.category.create({
      data: {
        uuid: uuidGen(),
        name: dto.category_name,
        slug: convertToSlug(dto.category_name),
      },
      select: {
        name: true,
        slug: true,
        uuid: true,
        subcategory: true,
      },
    });

    return {
      category,
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
    const category = await this.prisma.category.delete({
      where: {
        uuid,
      },
    });

    await this.prisma.subcategory.deleteMany({
      where: {
        categoryUuid: uuid,
      },
    });

    return category;
  }
}
