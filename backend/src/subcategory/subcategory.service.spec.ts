import { Test, TestingModule } from '@nestjs/testing';
import { SubcategoryService } from './subcategory.service';
import { PrismaService } from 'src/prisma.service';
import { BadGatewayException } from '@nestjs/common';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { returnSubcategoryObject } from './returnSubcategoryObject';

describe('SubcategoryService', () => {
  let service: SubcategoryService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubcategoryService,
        {
          provide: PrismaService,
          useValue: {
            subcategory: {
              findUnique: jest.fn(),
              create: jest.fn(),
              findMany: jest.fn(),
              delete: jest.fn(),
            },
            product: {
              deleteMany: jest.fn(),
            },
            $transaction: jest.fn((fn) => fn(prisma)),
          },
        },
      ],
    }).compile();

    service = module.get<SubcategoryService>(SubcategoryService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('byId', () => {
    it('should return a subcategory by uuid', async () => {
      const mockSubcategory = {
        uuid: '123',
        name: 'Test Subcategory',
        slug: 'test-subcategory',
        createdAt: new Date(),
        updatedAt: new Date(),
        icon: 'test-icon',
        categoryUuid: 'category-uuid',
      };
      jest
        .spyOn(prisma.subcategory, 'findUnique')
        .mockResolvedValue(mockSubcategory);

      const result = await service.byId('123');
      expect(result).toEqual(mockSubcategory);
      expect(prisma.subcategory.findUnique).toHaveBeenCalledWith({
        where: { uuid: '123' },
        select: returnSubcategoryObject,
      });
    });

    it('should throw an error if subcategory is not found', async () => {
      jest.spyOn(prisma.subcategory, 'findUnique').mockResolvedValue(null);

      await expect(service.byId('123')).rejects.toThrow(
        'Subcategory not found',
      );
    });
  });

  describe('create', () => {
    it('should create a new subcategory', async () => {
      const createSubcategoryDto: CreateSubcategoryDto = {
        name: 'New Subcategory',
        categoryUuid: 'category-uuid',
      };
      const mockSubcategory = {
        uuid: 'new-uuid',
        name: createSubcategoryDto.name,
        slug: 'new-subcategory',
        createdAt: new Date(),
        updatedAt: new Date(),
        icon: 'new-icon',
        categoryUuid: 'category-uuid',
      };

      jest
        .spyOn(prisma.subcategory, 'create')
        .mockResolvedValue(mockSubcategory);

      const result = await service.create(createSubcategoryDto);
      expect(result).toEqual(mockSubcategory);
      expect(prisma.subcategory.create).toHaveBeenCalledWith({
        data: {
          uuid: expect.any(String),
          name: 'New Subcategory',
          slug: 'new-subcategory',
          category: {
            connect: {
              uuid: 'category-uuid',
            },
          },
        },
      });
    });

    it('should throw BadGatewayException if creation fails', async () => {
      jest
        .spyOn(prisma.subcategory, 'create')
        .mockRejectedValue(new Error('Creation failed'));

      const createSubcategoryDto: CreateSubcategoryDto = {
        name: 'New Subcategory',
        categoryUuid: 'category-uuid',
      };

      await expect(service.create(createSubcategoryDto)).rejects.toThrow(
        BadGatewayException,
      );
    });
  });

  describe('findAll', () => {
    it('should return all subcategories for a given categoryUuid', async () => {
      const mockSubcategories = [
        {
          uuid: '123',
          name: 'Subcategory 1',
          slug: 'subcategory-1',
          createdAt: new Date(),
          updatedAt: new Date(),
          icon: 'icon-1',
          categoryUuid: 'category-uuid',
        },
        {
          uuid: '456',
          name: 'Subcategory 2',
          slug: 'subcategory-2',
          createdAt: new Date(),
          updatedAt: new Date(),
          icon: 'icon-2',
          categoryUuid: 'category-uuid',
        },
      ];
      jest
        .spyOn(prisma.subcategory, 'findMany')
        .mockResolvedValue(mockSubcategories);

      const result = await service.findAll('category-uuid');
      expect(result).toEqual({
        categoryUuid: 'category-uuid',
        subcategories: mockSubcategories,
      });
      expect(prisma.subcategory.findMany).toHaveBeenCalledWith({
        where: {
          category: {
            uuid: 'category-uuid',
          },
        },
        select: returnSubcategoryObject,
      });
    });

    it('should throw BadGatewayException if fetching fails', async () => {
      jest
        .spyOn(prisma.subcategory, 'findMany')
        .mockRejectedValue(new Error('Fetch failed'));

      await expect(service.findAll('category-uuid')).rejects.toThrow(
        BadGatewayException,
      );
    });
  });

  describe('remove', () => {
    it('should delete a subcategory by uuid', async () => {
      const mockSubcategory = {
        uuid: '123',
        name: 'Subcategory to Delete',
        slug: 'subcategory-to-delete',
        createdAt: new Date(),
        updatedAt: new Date(),
        icon: 'delete-icon',
        categoryUuid: 'category-uuid',
      };

      jest.spyOn(prisma.product, 'deleteMany').mockResolvedValue(undefined);
      jest
        .spyOn(prisma.subcategory, 'delete')
        .mockResolvedValue(mockSubcategory);
      jest
        .spyOn(prisma, '$transaction')
        .mockImplementation(async (fn) => fn(prisma));

      const result = await service.remove('123');
      expect(result).toEqual(mockSubcategory);
      expect(prisma.product.deleteMany).toHaveBeenCalledWith({
        where: {
          subcategoryUuid: '123',
        },
      });
      expect(prisma.subcategory.delete).toHaveBeenCalledWith({
        where: { uuid: '123' },
        select: { ...returnSubcategoryObject, categoryUuid: true },
      });
    });

    it('should throw BadGatewayException if deletion fails', async () => {
      jest
        .spyOn(prisma, '$transaction')
        .mockRejectedValue(new Error('Deletion failed'));

      await expect(service.remove('123')).rejects.toThrow(BadGatewayException);
    });
  });
});
