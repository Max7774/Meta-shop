/* eslint-disable no-console */
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { PaginationService } from 'src/pagination/pagination.service';
import { PrismaService } from 'src/prisma.service';
import { EnumProductsSort, GetAllProductDto } from './dto/get-all.product.dto';
import { ProductDto } from './dto/product.dto';
import {
  productReturnObject,
  productReturnObjectFull,
} from './return-product.object';
import { convertToNumber } from 'src/utils/convert-to-number';
import { convertToSlug } from 'src/utils/convertToSlug';
import { uuidGen } from 'src/utils/uuidGenerator';
import { promises as fs } from 'fs';
import { SubcategoryService } from 'src/subcategory/subcategory.service';

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private paginationService: PaginationService,
    private subcategoryService: SubcategoryService,
  ) {}

  async getAll(dto: GetAllProductDto = {}) {
    const { perPage, skip } = this.paginationService.getPagination(dto);

    const filters = this.createFilter(dto);

    const currentProducts = await this.prisma.product.findMany({
      where: filters,
      orderBy: this.getSortOption(dto.sort),
      skip,
      take: perPage,
      select: productReturnObject,
    });

    const products = currentProducts.map((product) => {
      if (product.createdAt > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) {
        return {
          ...product,
          isNew: true,
        };
      } else {
        return {
          ...product,
          isNew: false,
        };
      }
    });

    return {
      products,
      length: await this.prisma.product.count({
        where: filters,
      }),
    };
  }

  private createFilter(dto: GetAllProductDto): Prisma.ProductWhereInput {
    const filters: Prisma.ProductWhereInput[] = [];

    if (dto.searchTerm) filters.push(this.getSearchTermFilter(dto.searchTerm));

    if (dto.ratings)
      filters.push(
        this.getRatingFilter(dto.ratings.split('|').map((rating) => +rating)),
      );

    if (dto.minPrice || dto.maxPrice)
      filters.push(
        this.getPriceFilter(
          convertToNumber(dto.minPrice),
          convertToNumber(dto.maxPrice),
        ),
      );

    if (dto.categoryUuid)
      filters.push(this.getCategoryFilter(dto.categoryUuid));

    return filters.length ? { AND: filters } : {};
  }

  private getSortOption(
    sort: EnumProductsSort,
  ): Prisma.ProductOrderByWithRelationInput[] {
    switch (sort) {
      case EnumProductsSort.LOW_PRICE:
        return [{ price: 'asc' }];
      case EnumProductsSort.HIGH_PRICE:
        return [{ price: 'desc' }];
      case EnumProductsSort.OLDEST:
        return [{ createdAt: 'asc' }];
      default:
        return [{ createdAt: 'desc' }];
    }
  }

  private getSearchTermFilter(searchTerm: string): Prisma.ProductWhereInput {
    return {
      OR: [
        {
          subcategory: {
            name: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        },
        {
          name: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
      ],
    };
  }

  private getRatingFilter(ratings: number[]): Prisma.ProductWhereInput {
    return {
      reviews: {
        some: {
          rating: {
            in: ratings,
          },
        },
      },
    };
  }

  private getPriceFilter(
    minPrice?: number,
    maxPrice?: number,
  ): Prisma.ProductWhereInput {
    let priceFilter: Prisma.IntFilter | undefined = undefined;

    if (minPrice) {
      priceFilter = {
        ...priceFilter,
        gte: minPrice,
      };
    }

    if (maxPrice) {
      priceFilter = {
        ...priceFilter,
        lte: maxPrice,
      };
    }

    return {
      price: priceFilter,
    };
  }

  private getCategoryFilter(subcategoryUuid: string): Prisma.ProductWhereInput {
    return {
      subcategoryUuid,
    };
  }

  async byId(uuid: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        uuid,
      },
      select: productReturnObjectFull,
    });

    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  }

  async bySlug(slug: string) {
    try {
      const product = await this.prisma.product.findUnique({
        where: {
          slug,
        },
        select: productReturnObjectFull,
      });

      if (!product) {
        throw new NotFoundException('Product not found');
      }

      if (product.createdAt > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) {
        return {
          ...product,
          isNew: true,
        };
      } else {
        return {
          ...product,
          isNew: false,
        };
      }
    } catch (error) {
      console.error('Failed to delete product:', error);
      throw error;
    }
  }

  async bySubcategory(subcategorySlug: string) {
    const products = await this.prisma.product.findMany({
      where: {
        subcategory: {
          slug: subcategorySlug,
        },
      },
      select: productReturnObjectFull,
    });

    if (!products) throw new NotFoundException('Products not found');

    return products;
  }

  async getSimilar(uuid: string) {
    const currentProduct = await this.byId(uuid);

    if (!currentProduct)
      throw new NotFoundException('Current product not found');

    const products = await this.prisma.product.findMany({
      where: {
        subcategory: {
          name: currentProduct.subcategory.name,
        },
        NOT: {
          uuid: currentProduct.uuid,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: productReturnObject,
    });

    return products;
  }

  async createProduct(dto: ProductDto) {
    const {
      description,
      price,
      name,
      subcategoryUuid,
      discount,
      unitofmeasurement,
      inStock,
      quantity,
    } = dto;

    const isProduct = await this.prisma.product.findUnique({
      where: {
        name,
      },
    });

    if (isProduct) throw new NotFoundException('Product is exist');

    const product = await this.prisma.product.create({
      data: {
        uuid: uuidGen(),
        name,
        description,
        slug: convertToSlug(dto.name),
        price,
        quantity: quantity || 0,
        unitofmeasurement,
        inStock: inStock || true,
        discount: discount || 0,
        subcategory: {
          connect: {
            uuid: subcategoryUuid,
          },
        },
      },
    });

    return product;
  }

  async updateProduct(uuid: string, dto: ProductDto) {
    try {
      const {
        description,
        price,
        name,
        subcategoryUuid,
        discount,
        inStock,
        unitofmeasurement,
      } = dto;

      const { uuid: subcatUuid } = await this.subcategoryService.byId(
        subcategoryUuid,
      );

      const product = await this.prisma.product.update({
        where: {
          uuid,
        },
        data: {
          description,
          discount,
          price,
          name,
          inStock,
          unitofmeasurement,
          slug: convertToSlug(name),
          subcategory: {
            connect: {
              uuid: subcatUuid,
            },
          },
        },
        select: productReturnObjectFull,
      });

      return product;
    } catch (error) {
      throw new UnauthorizedException('Product is not found');
    }
  }

  async deleteProduct(uuid: string) {
    try {
      const product = await this.byId(uuid);
      // Начинаем транзакцию
      const deletedProduct = await this.prisma.$transaction(async (prisma) => {
        // 1. Удаляем связанные UserClick
        await prisma.userClick.deleteMany({
          where: {
            productUuid: uuid,
          },
        });

        // 2. Удаляем связанные OrderItem
        await prisma.orderItem.deleteMany({
          where: {
            productUuid: uuid,
          },
        });

        // 3. Удаляем заказы без элементов
        await prisma.order.deleteMany({
          where: {
            items: {
              none: {},
            },
          },
        });

        // 5. Удаляем связанные PhotoFile
        await prisma.photoFile.deleteMany({
          where: {
            productUuid: uuid,
          },
        });

        product.images.forEach(async (image) => {
          // 6. Удаляем связанные PhotoFile
          const filePath = `${process.env.DESTINATION}/${image}`;
          await fs.unlink(filePath);
        });

        // 7. Удаляем сам Product
        const deletedProduct = await prisma.product.delete({
          where: {
            uuid,
          },
        });

        // Возвращаем удаленный продукт
        return deletedProduct;
      });

      return deletedProduct;
    } catch (error) {
      console.error('Failed to delete product:', error);
      throw error;
    }
  }

  private shuffle(array: Product[]): Product[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  async recommendations(userUuid: string) {
    const userClicks = await this.prisma.user.findUnique({
      where: {
        uuid: userUuid,
      },
      include: {
        clicks: {
          select: {
            product: true,
          },
        },
      },
    });

    const userFavorites = await this.prisma.user.findUnique({
      where: {
        uuid: userUuid,
      },
      include: {
        favorites: true,
        orders: {
          select: {
            items: true,
          },
        },
      },
    });

    const favoriteProductIds = userFavorites.favorites.map(
      (favorite) => favorite.uuid,
    );
    const clickedProductIds = userClicks.clicks.map(
      (click) => click.product.uuid,
    );
    const orderedProductIds = userFavorites.orders
      .map((order) => order.items.map((item) => item.productUuid))
      .flat();

    const uniqueProductIds = [
      ...new Set([
        ...favoriteProductIds,
        ...clickedProductIds,
        ...orderedProductIds,
      ]),
    ];

    const recommendedProducts = await this.prisma.product.findMany({
      where: {
        uuid: {
          in: uniqueProductIds,
        },
      },
    });

    const shuffledProducts = this.shuffle(recommendedProducts);
    const randomProducts = shuffledProducts.slice(0, 4);

    return randomProducts;
  }

  async click(userUuid: string, productUuid: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        uuid: productUuid,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    await this.prisma.userClick.create({
      data: {
        uuid: uuidGen(),
        productUuid,
        userUuid,
      },
    });

    return 'OK';
  }
}
