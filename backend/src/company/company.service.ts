import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { PrismaService } from 'src/prisma.service';
import { uuidGen } from 'src/utils/uuidGenerator';
import { EnumRoleOfUser } from '@prisma/client';
import { generateToken } from 'src/utils/generateToken';
import { hash } from 'argon2';
import { Decimal } from '@prisma/client/runtime/library';
import { createTransport, Transporter } from 'nodemailer';

@Injectable()
export class CompanyService {
  private transporter: Transporter;

  constructor(private prisma: PrismaService) {
    this.transporter = createTransport({
      pool: true,
      host: 'smtp.mail.ru',
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAILDEV_INCOMING_USER,
        pass: process.env.MAILDEV_INCOMING_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async create(createCompanyDto: CreateCompanyDto) {
    try {
      const company = await this.prisma.company.create({
        data: {
          uuid: uuidGen(),
          name: createCompanyDto.name,
          officialName: createCompanyDto.officialName,
          address: createCompanyDto.address,
          email: createCompanyDto.email,
          phoneNumber: createCompanyDto.phoneNumber,
          deliveryPrice: createCompanyDto.deliveryPrice,
          minimumOrderPrice: createCompanyDto.minimumOrderPrice,
          registrationNumber: `company-${generateToken(5)}`,
        },
      });

      const companyPassword = generateToken(12);

      const user = await this.prisma.user.create({
        data: {
          uuid: uuidGen(),
          role: EnumRoleOfUser.COMPANY,
          phone_number: createCompanyDto.phoneNumber,
          companyUuid: company.uuid,
          password: await hash(companyPassword),
          email: `admin@${createCompanyDto.englishName.toLocaleLowerCase()}.com`,
          verified: true,
        },
        select: {
          email: true,
        },
      });

      await this.transporter.sendMail({
        from: process.env.MAILDEV_INCOMING_USER,
        to: process.env.MAILDEV_AUDIT_USER,
        subject: 'Добавление компании',
        text: `Вы добавили новую компанию. Её email: ${user.email}. Её пароль: ${companyPassword}`,
      });

      return {
        ...user,
        password: companyPassword,
        uuid: company.uuid,
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  async getAllCompanies() {
    try {
      return await this.prisma.company.findMany({
        select: {
          uuid: true,
          createdAt: true,
          name: true,
          officialName: true,
          address: true,
          email: true,
          phoneNumber: true,
          logoPath: true,
          deliveryPrice: true,
          minimumOrderPrice: true,
          users: {
            select: {
              uuid: true,
              email: true,
            },
          },
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getCompanyProducts(uuid: string) {
    try {
      return await this.prisma.companyProduct.findMany({
        where: {
          uuid,
        },
        select: {
          product: true,
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getCompanyStatistic(uuid: string) {
    try {
      const { companyUuid } = await this.prisma.user.findUnique({
        where: {
          uuid,
        },
      });

      const totalProducts = await this.prisma.companyProduct.findMany({
        where: {
          companyUuid,
        },
        select: {
          product: true,
        },
      });

      const totalOrders = await this.prisma.order.count({
        where: {
          items: {
            some: {
              product: {
                company: {
                  some: {
                    companyUuid,
                  },
                },
              },
            },
          },
        },
      });

      const totalSalesResult = await this.prisma.order.aggregate({
        where: {
          items: {
            some: {
              product: {
                company: {
                  some: {
                    companyUuid,
                  },
                },
              },
            },
          },
        },
        _sum: {
          total: true,
        },
      });
      const totalSales = totalSalesResult._sum.total || 0;

      const productSales = await this.prisma.orderItem.findMany({
        where: {
          product: {
            company: {
              some: {
                companyUuid,
              },
            },
          },
        },
      });

      const productsWithSales = await Promise.all(
        productSales.map(async (item) => {
          const product = await this.prisma.product.findUnique({
            where: { uuid: item.productUuid },
            select: { name: true },
          });
          return {
            productName: product.name,
            unitsSold: productSales.reduce((acc, item) => {
              return new Decimal(item.quantity).add(acc);
            }, item.quantity),
          };
        }),
      );

      return {
        totalProducts: totalProducts.length,
        totalOrders,
        totalSales,
        productsWithSales,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async deleteCompany(uuid: string, userUuid: string) {
    try {
      const deletedCompany = await this.prisma.$transaction(async (prisma) => {
        await prisma.user.delete({
          where: {
            uuid: userUuid,
          },
        });

        try {
          await prisma.companyProduct.deleteMany({
            where: {
              companyUuid: uuid,
            },
          });
        } catch (error) {
          throw new BadRequestException(error);
        }

        try {
          await prisma.photoFile.deleteMany({
            where: {
              companyUuid: uuid,
            },
          });
        } catch (error) {
          throw new BadRequestException(error);
        }

        const company = await prisma.company.delete({
          where: {
            uuid,
          },
        });

        return company;
      });

      return deletedCompany;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getCompanyInfo(uuid: string) {
    try {
      const { companyUuid } = await this.prisma.user.findUnique({
        where: {
          uuid,
        },
      });
      const company = await this.prisma.company.findUnique({
        where: {
          uuid: companyUuid,
        },
        select: {
          uuid: true,
          createdAt: true,
          name: true,
          officialName: true,
          registrationNumber: true,
          deliveryPrice: true,
          minimumOrderPrice: true,
          address: true,
          logoPath: true,
          email: true,
          phoneNumber: true,
          companyProducts: true,
          users: true,
        },
      });

      return company;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async editCompanyInfo(dto: CreateCompanyDto, uuid: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          uuid,
        },
      });

      const company = await this.prisma.company.update({
        where: {
          uuid: user.companyUuid,
        },
        data: {
          name: dto.name,
          officialName: dto.officialName,
          address: dto.address,
          email: dto.email,
          phoneNumber: dto.phoneNumber,
          deliveryPrice: dto.deliveryPrice,
          minimumOrderPrice: dto.minimumOrderPrice,
        },
        select: {
          uuid: true,
          createdAt: true,
          name: true,
          officialName: true,
          registrationNumber: true,
          deliveryPrice: true,
          minimumOrderPrice: true,
          address: true,
          email: true,
          phoneNumber: true,
          companyProducts: true,
          users: true,
        },
      });

      return company;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getAllCompanyProducts() {
    try {
      const products = await this.prisma.companyProduct.findMany();
      return products;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
