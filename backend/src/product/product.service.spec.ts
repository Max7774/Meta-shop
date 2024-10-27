import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { PrismaService } from 'src/prisma.service';
import { PaginationService } from 'src/pagination/pagination.service';
import { SubcategoryService } from 'src/subcategory/subcategory.service';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { EnumRoleOfUser } from '@prisma/client';
import { promises as fs } from 'fs';

jest.mock('src/utils/uuidGenerator', () => ({
  uuidGen: jest.fn().mockReturnValue('generated-uuid'),
}));

jest.spyOn(fs, 'unlink').mockImplementation();

describe('ProductService', () => {
  let service: ProductService;
  let prisma: PrismaService;
  let subcategoryService: SubcategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: PrismaService,
          useValue: {
            product: {
              findUnique: jest.fn(),
              findMany: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
              count: jest.fn(),
            },
            userClick: {
              deleteMany: jest.fn(),
            },
            orderItem: {
              deleteMany: jest.fn(),
            },
            order: {
              deleteMany: jest.fn(),
            },
            photoFile: {
              deleteMany: jest.fn(),
            },
            $transaction: jest.fn((callback) =>
              callback({
                product: prisma.product,
                userClick: prisma.userClick,
                orderItem: prisma.orderItem,
                order: prisma.order,
                photoFile: prisma.photoFile,
              }),
            ),
          },
        },
        {
          provide: PaginationService,
          useValue: {
            getPagination: jest.fn().mockReturnValue({ perPage: 10, skip: 0 }),
          },
        },
        {
          provide: SubcategoryService,
          useValue: {
            byId: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    prisma = module.get<PrismaService>(PrismaService);
    subcategoryService = module.get<SubcategoryService>(SubcategoryService);

    jest.spyOn(fs, 'unlink').mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  describe('getAll', () => {
    it('should return all products with pagination', async () => {
      const mockProducts = [
        {
          uuid: 'product-uuid-1',
          name: 'Product 1',
          price: 100,
          slug: 'product-1',
          description: 'Description 1',
          peculiarities: 'Peculiarities 1',
          quantity: 10,
          discount: 5,
          images: ['image1.png'],
          unitofmeasurement: 'kg',
          inStock: true,
          isNew: true,
          userUuid: 'user-uuid',
          subcategoryUuid: 'subcategory-uuid',
          createdAt: new Date(),
          updatedAt: new Date(),
          companyUuid: 'company-uuid',
        },
        {
          uuid: 'product-uuid-2',
          name: 'Product 2',
          price: 200,
          isNew: true,
          slug: 'product-2',
          description: 'Description 2',
          peculiarities: 'Peculiarities 2',
          quantity: 15,
          discount: 10,
          images: ['image2.png'],
          unitofmeasurement: 'liters',
          inStock: false,
          userUuid: 'user-uuid',
          subcategoryUuid: 'subcategory-uuid',
          createdAt: new Date(),
          updatedAt: new Date(),
          companyUuid: 'company-uuid',
        },
      ];

      jest.spyOn(prisma.product, 'findMany').mockResolvedValue(mockProducts);
      jest.spyOn(prisma.product, 'count').mockResolvedValue(2);

      const result = await service.getAll({});
      expect(result).toEqual({ products: mockProducts, length: 2 });
      expect(prisma.product.findMany).toHaveBeenCalledWith({
        where: expect.any(Object),
        orderBy: expect.any(Object),
        skip: 0,
        take: 10,
        select: expect.any(Object),
      });
    });
  });

  describe('byId', () => {
    it('should return a product by uuid', async () => {
      const uuid = 'product-uuid';
      const mockProduct = {
        uuid,
        name: 'Product Name',
        price: 100,
        slug: 'product-name',
        description: 'Product description',
        peculiarities: 'Some peculiarities',
        quantity: 50,
        discount: 5,
        images: ['image1.png', 'image2.png'],
        unitofmeasurement: 'kg',
        inStock: true,
        userUuid: 'user-uuid',
        subcategoryUuid: 'subcategory-uuid',
        createdAt: new Date(),
        updatedAt: new Date(),
        companyUuid: 'company-uuid',
      };

      jest.spyOn(prisma.product, 'findUnique').mockResolvedValue(mockProduct);

      const result = await service.byId(uuid);
      expect(result).toEqual(mockProduct);
      expect(prisma.product.findUnique).toHaveBeenCalledWith({
        where: { uuid },
        select: expect.any(Object),
      });
    });

    it('should throw an error if product is not found', async () => {
      jest.spyOn(prisma.product, 'findUnique').mockResolvedValue(null);
      await expect(service.byId('invalid-uuid')).rejects.toThrow(
        'Product not found',
      );
    });
  });

  describe('createProduct', () => {
    it('should create a new product', async () => {
      const dto: ProductDto = {
        name: 'New Product',
        price: 150,
        unitofmeasurement: 'kg',
        inStock: true,
        subcategoryUuid: 'subcategory-uuid',
        description: 'Product description',
        discount: 10,
        quantity: 50,
        companyUuid: 'company-uuid',
      };

      const mockProduct = {
        uuid: 'generated-uuid',
        ...dto,
        slug: 'new-product',
        peculiarities: 'Peculiarities',
        images: ['image1.png'],
        userUuid: 'user-uuid',
        createdAt: new Date(),
        updatedAt: new Date(),
        companyUuid: 'company-uuid',
      };

      jest.spyOn(prisma.product, 'create').mockResolvedValue(mockProduct);
      jest.spyOn(subcategoryService, 'byId').mockResolvedValue({
        uuid: dto.subcategoryUuid,
        name: 'subcategory name',
        createdAt: new Date(),
        updatedAt: new Date(),
        slug: 'subcategory-slug',
        _count: { products: 0, category: 0 },
        category: {
          uuid: 'category-uuid',
          name: 'category name',
          icon: 'category-icon.png',
          createdAt: new Date(),
          updatedAt: new Date(),
          slug: 'category-slug',
        },
        icon: 'icon.png',
        categoryUuid: 'category-uuid',
        products: [],
      });

      const result = await service.createProduct(dto, '');
      expect(result).toEqual(mockProduct);
      expect(prisma.product.create).toHaveBeenCalledWith({
        data: {
          uuid: 'generated-uuid',
          name: dto.name,
          description: dto.description,
          slug: expect.any(String),
          price: dto.price,
          quantity: dto.quantity,
          unitofmeasurement: dto.unitofmeasurement,
          inStock: dto.inStock,
          discount: dto.discount,
          subcategory: {
            connect: {
              uuid: dto.subcategoryUuid,
            },
          },
        },
      });
    });

    it('should throw NotFoundException if subcategory does not exist', async () => {
      const dto: ProductDto = {
        name: 'New Product',
        price: 150,
        unitofmeasurement: 'kg',
        description: 'Product description',
        discount: 10,
        quantity: 50,
        inStock: true,
        companyUuid: 'company-uuid',
        subcategoryUuid: 'invalid-subcategory-uuid',
      };

      jest
        .spyOn(subcategoryService, 'byId')
        .mockRejectedValue(new NotFoundException('Subcategory not found'));

      await expect(service.createProduct(dto, '')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateProduct', () => {
    it('should update a product', async () => {
      const uuid = 'product-uuid';
      const dto: ProductDto = {
        name: 'Updated Product',
        price: 200,
        unitofmeasurement: 'liters',
        inStock: false,
        subcategoryUuid: 'subcategory-uuid',
        description: 'Updated description',
        discount: 15,
        quantity: 30,
        companyUuid: 'company-uuid',
      };

      const mockProduct = {
        uuid,
        ...dto,
        slug: 'updated-product',
        companyUuid: 'company-uuid',
        peculiarities: 'Updated peculiarities',
        images: ['image3.png'],
        userUuid: 'user-uuid',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prisma.product, 'update').mockResolvedValue(mockProduct);
      jest.spyOn(subcategoryService, 'byId').mockResolvedValue({
        uuid: dto.subcategoryUuid,
        name: 'subcategory name',
        createdAt: new Date(),
        updatedAt: new Date(),
        slug: 'subcategory-slug',
        _count: { products: 0, category: 0 },
        category: {
          uuid: 'category-uuid',
          name: 'category name',
          icon: 'category-icon.png',
          createdAt: new Date(),
          updatedAt: new Date(),
          slug: 'category-slug',
        },
        icon: 'icon.png',
        categoryUuid: 'category-uuid',
        products: [],
      });

      const result = await service.updateProduct(uuid, dto);
      expect(result).toEqual(mockProduct);
      expect(prisma.product.update).toHaveBeenCalledWith({
        where: { uuid },
        data: {
          name: dto.name,
          description: dto.description,
          price: dto.price,
          unitofmeasurement: dto.unitofmeasurement,
          inStock: dto.inStock,
          discount: dto.discount,
          slug: expect.any(String),
          subcategory: {
            connect: {
              uuid: dto.subcategoryUuid,
            },
          },
        },
        select: expect.objectContaining({
          createdAt: true,
          description: true,
          discount: true,
          images: true,
          inStock: true,
          name: true,
          peculiarities: true,
          price: true,
          quantity: true,
          reviews: expect.objectContaining({
            orderBy: expect.any(Object),
            select: expect.any(Object),
          }),
          slug: true,
          subcategory: expect.objectContaining({
            select: expect.any(Object),
          }),
          unitofmeasurement: true,
          uuid: true,
        }),
      });
    });

    it('should throw UnauthorizedException if subcategory does not exist', async () => {
      const uuid = 'product-uuid';
      const dto: ProductDto = {
        name: 'Updated Product',
        price: 200,
        unitofmeasurement: 'liters',
        inStock: false,
        subcategoryUuid: 'subcategory-uuid',
        description: 'Updated description',
        discount: 15,
        quantity: 30,
        companyUuid: 'company-uuid',
      };

      jest
        .spyOn(subcategoryService, 'byId')
        .mockRejectedValue(new NotFoundException('Subcategory not found'));

      await expect(service.updateProduct(uuid, dto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product by uuid', async () => {
      const uuid = 'product-uuid';
      const mockProduct = {
        uuid,
        name: 'Product to delete',
        slug: 'product-to-delete',
        description: 'Description of product to delete',
        peculiarities: 'Some peculiarities',
        quantity: 20,
        price: 150,
        discount: 10,
        images: ['image1.png', 'image2.png'],
        unitofmeasurement: 'kg',
        inStock: true,
        userUuid: 'user-uuid',
        subcategoryUuid: 'subcategory-uuid',
        createdAt: new Date(),
        updatedAt: new Date(),
        companyUuid: 'company-uuid',
        company: {
          uuid: 'company-uuid',
          createdAt: new Date(),
          name: 'string',
          updatedAt: new Date(),
          officialName: 'string',
          registrationNumber: 'string',
          address: 'string',
          email: 'string',
          phoneNumber: 'string',
        },
        user: {
          uuid: 'user-uuid',
          createdAt: new Date(),
          updatedAt: new Date(),
          email: 'user@example.com',
          phone_number: '123456789',
          birth_day: '1990-01-01',
          first_name: 'John',
          second_name: 'Doe',
          password: '',
          avatarPath: 'avatar.png',
          verified: true,
          verifyToken: 'token',
          role: EnumRoleOfUser.DEFAULT_USER,
          companyUuid: '',
          currentAddress: '123 Main St',
        },
        subcategory: {
          uuid: 'subcategory-uuid',
          name: 'subcategory name',
          slug: 'subcategory-slug',
          createdAt: new Date(),
          categoryUuid: 'subcategory-uuid',
          updatedAt: new Date(),
          icon: 'icon.png',
          category: {
            uuid: 'category-uuid',
            name: 'category name',
            createdAt: new Date(),
            updatedAt: new Date(),
            slug: 'category-slug',
            icon: 'category-icon.png',
            subcategoryUuid: 'subcategory-uuid',
          },
        },
        _count: {
          user: 0,
          subcategory: 0,
          orderItems: 0,
          reviews: 0,
          photoFiles: 0,
          clicks: 0,
          company: 0,
        },
        orderItems: [],
        reviews: [],
        photoFiles: [],
        clicks: [],
      };

      jest.spyOn(service, 'byId').mockResolvedValue(mockProduct);
      jest.spyOn(prisma.product, 'delete').mockResolvedValue(mockProduct);
      jest
        .spyOn(prisma.userClick, 'deleteMany')
        .mockResolvedValue({ count: 1 });
      jest
        .spyOn(prisma.orderItem, 'deleteMany')
        .mockResolvedValue({ count: 1 });
      jest.spyOn(prisma.order, 'deleteMany').mockResolvedValue({ count: 1 });
      jest
        .spyOn(prisma.photoFile, 'deleteMany')
        .mockResolvedValue({ count: 1 });

      const result = await service.deleteProduct(uuid);
      expect(result).toEqual(mockProduct);
      expect(prisma.product.delete).toHaveBeenCalledWith({
        where: { uuid },
      });
      expect(prisma.userClick.deleteMany).toHaveBeenCalledWith({
        where: {
          productUuid: uuid,
        },
      });

      expect(prisma.orderItem.deleteMany).toHaveBeenCalledWith({
        where: {
          productUuid: uuid,
        },
      });

      expect(prisma.order.deleteMany).toHaveBeenCalledWith({
        where: {
          items: {
            none: {},
          },
        },
      });

      expect(prisma.photoFile.deleteMany).toHaveBeenCalledWith({
        where: {
          productUuid: uuid,
        },
      });

      for (const image of mockProduct.images) {
        expect(fs.unlink).toHaveBeenCalledWith(`./uploads/${image}`);
      }
    });

    it('should throw an error if product is not found', async () => {
      const dto: ProductDto = {
        name: 'New Product',
        price: 150,
        unitofmeasurement: 'kg',
        description: 'Product description',
        discount: 10,
        quantity: 50,
        inStock: true,
        subcategoryUuid: 'invalid-subcategory-uuid',
        companyUuid: 'company-uuid',
      };

      jest.spyOn(subcategoryService, 'byId').mockImplementation(() => {
        throw new NotFoundException('Subcategory not found');
      });

      await expect(service.createProduct(dto, 'userUuid')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
