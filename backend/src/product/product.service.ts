/* eslint-disable no-console */
import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EnumRoleOfUser, Prisma, Product } from '@prisma/client';
import { PaginationService } from 'src/pagination/pagination.service';
import { PrismaService } from 'src/prisma.service';
import { EnumProductsSort, GetAllProductDto } from './dto/get-all.product.dto';
import { ProductDto } from './dto/product.dto';
import {
  productReturnObject,
  productReturnObjectFull,
} from './return-product.object';
// import { convertToNumber } from 'src/utils/convert-to-number';
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
    // const { perPage, skip } = this.paginationService.getPagination(dto);

    const filters = this.createFilter(dto);

    const currentProducts = await this.prisma.product.findMany({
      where: { ...(filters || {}), isDeleted: false },
      orderBy: this.getSortOption(dto.sort),
      // skip,
      // take: perPage,
      select: {
        ...productReturnObject,
      },
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
        where: { ...(filters || {}), isDeleted: false },
      }),
    };
  }

  async getAllSoftDeleted(dto: GetAllProductDto = {}) {
    // const { perPage, skip } = this.paginationService.getPagination(dto);

    const filters = this.createFilter(dto);

    const currentProducts = await this.prisma.product.findMany({
      where: { ...(filters || {}), isDeleted: true },
      orderBy: this.getSortOption(dto.sort),
      // skip,
      // take: perPage,
      select: {
        ...productReturnObject,
        isDeleted: true,
      },
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
        where: { ...(filters || {}), isDeleted: true },
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

    // if (dto.minPrice || dto.maxPrice)
    //   filters.push(
    //     this.getPriceFilter(
    //       convertToNumber(dto.minPrice),
    //       convertToNumber(dto.maxPrice),
    //     ),
    //   );

    if (dto.categoryUuid)
      filters.push(this.getCategoryFilter(dto.categoryUuid));

    return filters.length ? { AND: filters } : {};
  }

  private getSortOption(
    sort: EnumProductsSort,
  ): Prisma.ProductOrderByWithRelationInput[] {
    switch (sort) {
      // case EnumProductsSort.LOW_PRICE:
      //   return [{ price: 'asc' }];
      // case EnumProductsSort.HIGH_PRICE:
      //   return [{ price: 'desc' }];
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

  // private getPriceFilter(
  //   minPrice?: number,
  //   maxPrice?: number,
  // ): Prisma.ProductWhereInput {
  //   let priceFilter: Prisma.IntFilter | undefined = undefined;

  //   if (minPrice) {
  //     priceFilter = {
  //       ...priceFilter,
  //       gte: minPrice,
  //     };
  //   }

  //   if (maxPrice) {
  //     priceFilter = {
  //       ...priceFilter,
  //       lte: maxPrice,
  //     };
  //   }

  //   return {
  //     company: {
  //       price: priceFilter,
  //     },
  //   };
  // }

  private getCategoryFilter(subcategoryUuid: string): Prisma.ProductWhereInput {
    return {
      subcategoryUuid,
    };
  }

  async byId(uuid: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        uuid,
        isDeleted: false,
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
          isDeleted: false,
        },
        select: {
          ...productReturnObjectFull,
        },
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
        isDeleted: false,
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

  async createProduct(dto: ProductDto, userUuid: string) {
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

    const companyUser = await this.prisma.user.findUnique({
      where: {
        uuid: userUuid,
      },
      select: {
        companyUuid: true,
      },
    });

    const isProduct = await this.prisma.product.findUnique({
      where: {
        name,
      },
    });

    if (isProduct) throw new NotFoundException('Product is exist');

    try {
      await this.subcategoryService.byId(dto.subcategoryUuid);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Subcategory not found');
      }
    }

    const product = await this.prisma.product.create({
      data: {
        uuid: uuidGen(),
        name,
        description,
        slug: convertToSlug(dto.name),
        unitofmeasurement,
        inStock: inStock || true,
        subcategory: {
          connect: {
            uuid: subcategoryUuid,
          },
        },
      },
    });

    await this.prisma.companyProduct.create({
      data: {
        uuid: uuidGen(),
        productUuid: product.uuid,
        companyUuid: companyUser.companyUuid || '',
        price,
        quantity: quantity || 0,
        discount: discount || 0,
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
        companyUuid,
      } = dto;

      const { uuid: subcatUuid } = await this.subcategoryService.byId(
        subcategoryUuid,
      );

      const { name: companyName, companyProducts } =
        await this.prisma.company.findUnique({
          where: {
            uuid: companyUuid,
          },
          select: {
            name: true,
            companyProducts: {
              select: {
                uuid: true,
                productUuid: true,
              },
            },
          },
        });

      if (!companyName) throw new BadGatewayException('Компании не существует');

      const companyProductUuid =
        companyProducts.find((item) => item.productUuid === uuid)?.uuid || '';

      try {
        const isExist = await this.prisma.companyProduct.findUnique({
          where: {
            uuid: companyProductUuid,
          },
        });

        if (isExist) {
          await this.prisma.companyProduct.update({
            where: {
              uuid: companyProductUuid,
            },
            data: {
              price,
              quantity: dto.quantity || 0,
              discount: discount || 0,
            },
          });
        } else {
          await this.prisma.companyProduct.create({
            data: {
              uuid: uuidGen(),
              productUuid: uuid,
              companyUuid: companyUuid,
              price,
              quantity: dto.quantity || 0,
              discount: discount || 0,
            },
          });
        }
      } catch (error) {
        throw new BadGatewayException(`Ошибка создания компании, ${error}`);
      }

      const product = await this.prisma.product.update({
        where: {
          uuid,
        },
        data: {
          description,
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
      throw new BadGatewayException(`Product is not found, ${error}`);
    }
  }

  async deleteProduct(uuid: string, type: 'soft' | 'hard', userUuid: string) {
    try {
      const product = await this.byId(uuid);
      const { role, companyUuid } = await this.prisma.user.findUnique({
        where: {
          uuid: userUuid,
        },
        select: {
          role: true,
          companyUuid: true,
        },
      });

      if (type === 'soft') {
        if (role === EnumRoleOfUser.COMPANY) {
          const companyProduct = await this.prisma.companyProduct.findMany({
            where: {
              companyUuid,
              productUuid: uuid,
            },
            select: {
              uuid: true,
              productUuid: true,
            },
          });

          const companyProductUuid = companyProduct[0].uuid;

          await this.prisma.companyProduct.delete({
            where: {
              uuid: companyProductUuid,
            },
          });

          return 'OK';
        } else if (role === EnumRoleOfUser.ADMIN) {
          const deletedProduct = await this.prisma.product.update({
            where: {
              uuid,
            },
            data: {
              isDeleted: true,
            },
          });

          return deletedProduct;
        }
      } else if (type === 'hard') {
        try {
          const deletedProduct = await this.prisma.$transaction(
            async (prisma) => {
              try {
                await prisma.photoFile.deleteMany({
                  where: {
                    productUuid: uuid,
                  },
                });
              } catch (error) {
                console.error('Failed to delete photoFile of product:', error);
                throw error;
              }

              product.images.forEach(async (image) => {
                try {
                  const filePath = `${process.env.DESTINATION}/${image}`;
                  await fs.unlink(filePath);
                } catch (error) {
                  console.error('Failed to delete product images:', error);
                  return;
                }
              });

              await prisma.companyProduct.deleteMany({
                where: {
                  productUuid: uuid,
                },
              });

              await prisma.orderItem.deleteMany({
                where: {
                  productUuid: uuid,
                },
              });

              const deletedProduct = await prisma.product.delete({
                where: {
                  uuid,
                },
              });

              return deletedProduct;
            },
          );

          return deletedProduct;
        } catch (error) {
          throw new BadGatewayException(
            `Failed to delete product by $transaction: ${error}`,
          );
        }
      }
    } catch (error) {
      throw new BadGatewayException(`Failed to delete product: ${error}`);
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

  async recoverProduct(uuid: string) {
    const recoveredProduct = await this.prisma.product.update({
      where: {
        uuid,
      },
      data: {
        isDeleted: false,
      },
      select: {
        ...productReturnObject,
      },
    });

    const isImageExist = async () => {
      const filePath = `${process.env.DESTINATION}/${recoveredProduct.images[0]}`;
      try {
        await fs.access(filePath);
        return true;
      } catch (error) {
        return false;
      }
    };

    if (!(await isImageExist())) {
      await this.prisma.product.update({
        where: {
          uuid,
        },
        data: {
          images: ['default-product-photo.png'],
        },
      });
    }

    console.log(recoveredProduct);

    return recoveredProduct;
  }
}
