import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { GetAllProductDto } from './dto/get-all.product.dto';
import { EnumRoleOfUser } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: {
            getAll: jest.fn(),
            getSimilar: jest.fn(),
            bySlug: jest.fn(),
            bySubcategory: jest.fn(),
            recommendations: jest.fn(),
            click: jest.fn(),
            createProduct: jest.fn(),
            updateProduct: jest.fn(),
            deleteProduct: jest.fn(),
            byId: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should call ProductService.getAll with correct parameters', async () => {
      const queryDto: GetAllProductDto = {
        searchTerm: 'test',
        page: '1',
        perPage: '10',
      };
      const mockResponse = { products: [], length: 0 };

      jest.spyOn(service, 'getAll').mockResolvedValue(mockResponse);

      const result = await controller.getAll(queryDto);
      expect(result).toEqual(mockResponse);
      expect(service.getAll).toHaveBeenCalledWith(queryDto);
    });
  });

  describe('getSimilar', () => {
    it('should call ProductService.getSimilar with correct parameters', async () => {
      const uuid = 'product-uuid';
      const mockResponse = [];

      jest.spyOn(service, 'getSimilar').mockResolvedValue(mockResponse);

      const result = await controller.getSimilar(uuid);
      expect(result).toEqual(mockResponse);
      expect(service.getSimilar).toHaveBeenCalledWith(uuid);
    });
  });

  describe('getProductBySlug', () => {
    it('should call ProductService.bySlug with correct parameters', async () => {
      const slug = 'product-slug';
      const mockProduct = {
        isNew: true,
        name: 'Test Product',
        uuid: 'product-uuid',
        createdAt: new Date(),
        updatedAt: new Date(),
        slug: 'test-product',
        description: 'Test description',
        peculiarities: 'Test peculiarities',
        quantity: 10,
        price: 100,
        discount: 5,
        images: [],
        unitofmeasurement: 'kg',
        inStock: true,
        isDeleted: false,
        userUuid: 'user-uuid',
        subcategoryUuid: 'subcategory-uuid',
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
          currentAddress: '123 Main St',
          companyUuid: '',
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

      jest.spyOn(service, 'bySlug').mockResolvedValue(mockProduct);

      const result = await controller.getProductBySlug(slug);
      expect(result).toEqual(mockProduct);
      expect(service.bySlug).toHaveBeenCalledWith(slug);
    });
  });

  describe('getProductsByCategory', () => {
    it('should call ProductService.bySubcategory with correct parameters', async () => {
      const subcategorySlug = 'subcategory-slug';
      const mockProducts = [];

      jest.spyOn(service, 'bySubcategory').mockResolvedValue(mockProducts);

      const result = await controller.getProductsByCategory(subcategorySlug);
      expect(result).toEqual(mockProducts);
      expect(service.bySubcategory).toHaveBeenCalledWith(subcategorySlug);
    });
  });

  describe('getRecommendedProducts', () => {
    it('should call ProductService.recommendations with correct parameters', async () => {
      const userUuid = 'user-uuid';
      const mockProducts = [];

      jest.spyOn(service, 'recommendations').mockResolvedValue(mockProducts);

      const result = await controller.getRecommendedProducts(userUuid);
      expect(result).toEqual(mockProducts);
      expect(service.recommendations).toHaveBeenCalledWith(userUuid);
    });
  });

  describe('click', () => {
    it('should call ProductService.click with correct parameters', async () => {
      const productUuid = 'product-uuid';
      const userUuid = 'user-uuid';

      jest.spyOn(service, 'click').mockResolvedValue(undefined);

      const result = await controller.click(productUuid, userUuid);
      expect(result).toBeUndefined();
      expect(service.click).toHaveBeenCalledWith(userUuid, productUuid);
    });
  });

  describe('createProduct', () => {
    it('should call ProductService.createProduct with correct parameters', async () => {
      const dto = {
        name: 'New Product',
        price: 100,
        unitofmeasurement: 'kg',
        inStock: true,
        isDeleted: false,
        subcategoryUuid: 'subcategory-uuid',
        description: 'Test description',
        discount: 5,
        quantity: 10,
        companyUuid: 'company-uuid',
      };
      const mockProduct = {
        isNew: true,
        name: 'New Product',
        uuid: 'product-uuid',
        createdAt: new Date(),
        updatedAt: new Date(),
        slug: 'new-product',
        description: 'Test description',
        peculiarities: 'Test peculiarities',
        quantity: 10,
        price: 100,
        discount: 5,
        images: [],
        unitofmeasurement: 'kg',
        inStock: true,
        isDeleted: false,
        userUuid: 'user-uuid',
        subcategoryUuid: 'subcategory-uuid',
        companyUuid: 'company-uuid',
        _count: {
          reviews: 0,
          orderItems: 0,
          clicks: 0,
        },
      };

      jest.spyOn(service, 'createProduct').mockResolvedValue(mockProduct);

      const result = await controller.createProduct(dto, 'user-uuid');
      expect(result).toEqual(mockProduct);
      expect(service.createProduct).toHaveBeenCalledWith(dto, 'user-uuid');
    });
  });

  describe('updateProduct', () => {
    it('should call ProductService.updateProduct with correct parameters', async () => {
      const uuid = 'product-uuid';
      const dto = {
        name: 'Updated Product',
        price: 150,
        unitofmeasurement: 'liters',
        inStock: true,
        isDeleted: false,
        subcategoryUuid: 'subcategory-uuid',
        description: 'Updated description',
        discount: 10,
        companyUuid: 'company-uuid',
        quantity: 20,
      };
      const mockProduct = {
        isNew: false,
        name: 'Updated Product',
        uuid: 'product-uuid',
        createdAt: new Date(),
        updatedAt: new Date(),
        slug: 'updated-product',
        description: 'Updated description',
        peculiarities: 'Updated peculiarities',
        quantity: 20,
        price: 150,
        discount: 10,
        images: [],
        unitofmeasurement: 'liters',
        inStock: true,
        isDeleted: false,
        userUuid: 'user-uuid',
        subcategoryUuid: 'subcategory-uuid',
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
          currentAddress: '123 Main St',
          companyUuid: '',
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

      jest.spyOn(service, 'updateProduct').mockResolvedValue(mockProduct);

      const result = await controller.updateProduct(uuid, dto);
      expect(result).toEqual(mockProduct);
      expect(service.updateProduct).toHaveBeenCalledWith(uuid, dto);
    });
  });

  describe('deleteProduct', () => {
    it('should call ProductService.deleteProduct with correct parameters', async () => {
      const uuid = 'product-uuid';

      jest.spyOn(service, 'deleteProduct').mockResolvedValue(undefined);

      const result = await controller.deleteProduct(uuid);
      expect(result).toBeUndefined();
      expect(service.deleteProduct).toHaveBeenCalledWith(uuid);
    });
  });

  describe('getProduct', () => {
    it('should call ProductService.byId with correct parameters', async () => {
      const uuid = 'product-uuid';
      const mockProduct = {
        isNew: false,
        name: 'Product Name',
        uuid: 'product-uuid',
        createdAt: new Date(),
        updatedAt: new Date(),
        slug: 'product-name',
        description: 'Test description',
        peculiarities: 'Test peculiarities',
        quantity: 20,
        price: 200,
        discount: 15,
        images: [],
        unitofmeasurement: 'kg',
        inStock: true,
        isDeleted: false,
        userUuid: 'user-uuid',
        subcategoryUuid: 'subcategory-uuid',
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
          currentAddress: '123 Main St',
          companyUuid: '',
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

      const result = await controller.getProduct(uuid);
      expect(result).toEqual(mockProduct);
      expect(service.byId).toHaveBeenCalledWith(uuid);
    });

    it('should throw an error if product is not found', async () => {
      jest
        .spyOn(service, 'byId')
        .mockRejectedValue(new NotFoundException('Product not found'));

      await expect(controller.getProduct('invalid-uuid')).rejects.toThrow(
        'Product not found',
      );
    });
  });
});
