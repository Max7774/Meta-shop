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
import { CategoryService } from 'src/category/category.service';
import { convertToNumber } from 'src/utils/convert-to-number';
import { convertToSlug } from 'src/utils/convertToSlug';
import { uuidGen } from 'src/utils/uuidGenerator';

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private paginationService: PaginationService,
    private categoryService: CategoryService,
  ) {}

  async getAll(dto: GetAllProductDto = {}) {
    const { perPage, skip } = this.paginationService.getPagination(dto);

    const filters = this.createFilter(dto);

    const products = await this.prisma.product.findMany({
      where: filters,
      orderBy: this.getSortOption(dto.sort),
      skip,
      take: perPage,
      select: productReturnObject,
    });

    const currentProducts = products.map((product) => {
      return {
        ...product,
        isNew:
          product.createdAt > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      };
    });

    return {
      currentProducts,
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
          category: {
            name: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        },
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

  private getCategoryFilter(categoryUuid: string): Prisma.ProductWhereInput {
    return {
      categoryUuid,
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

      const currentProduct = {
        ...product,
        isNew:
          product.createdAt > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      };

      return currentProduct;
    } catch (error) {
      console.error('Failed to delete product:', error);
      throw error;
    }
  }

  async byCategory(categorySlug: string) {
    const products = await this.prisma.product.findMany({
      where: {
        category: {
          slug: categorySlug,
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
        category: {
          name: currentProduct.category.name,
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
      categoryUuid,
      peculiarities,
      subcategoryUuid,
      quantity,
      discount,
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
        peculiarities,
        slug: convertToSlug(dto.name),
        price,
        categoryUuid,
        subcategoryUuid,
        discount: discount || 0,
        quantity,
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
        categoryUuid,
        quantity,
        peculiarities,
        discount,
      } = dto;

      const { uuid: catUuid } = await this.categoryService.byId(categoryUuid);

      const product = await this.prisma.product.update({
        where: {
          uuid,
        },
        data: {
          description,
          discount,
          price,
          name,
          peculiarities,
          quantity,
          slug: convertToSlug(name),
          category: {
            connect: {
              uuid: catUuid,
            },
          },
        },
      });

      return product;
    } catch (error) {
      throw new UnauthorizedException('Product is not found');
    }
  }

  async deleteProduct(uuid: string) {
    try {
      const deletedProduct = await this.prisma.$transaction(async (prisma) => {
        const deletedProduct = await prisma.product.deleteMany({
          where: { uuid: { equals: uuid } },
        });
        await prisma.review.deleteMany({
          where: {
            productUuid: uuid,
          },
        });
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
