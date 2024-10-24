import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { PrismaService } from '../prisma.service';
import { CategoryDto } from './dto/category.dto';
import { NotFoundException } from '@nestjs/common';
import {
  returnCategoryObject,
  returnAllCategoryObject,
} from './return-category.object';
import { convertToSlug } from '../utils/convertToSlug';
import { uuidGen } from '../utils/uuidGenerator';

jest.mock('../utils/convertToSlug');
jest.mock('../utils/uuidGenerator');

const getMockPrismaService = () => ({
  category: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  subcategory: {
    deleteMany: jest.fn(),
  },
});

type MockedPrismaService = ReturnType<typeof getMockPrismaService>;

describe('CategoryService', () => {
  let categoryService: CategoryService;
  let prismaService: MockedPrismaService;

  beforeEach(async () => {
    const mockPrismaService = getMockPrismaService();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    categoryService = module.get<CategoryService>(CategoryService);
    prismaService = mockPrismaService;
  });

  it('should be defined', () => {
    expect(categoryService).toBeDefined();
  });

  describe('byId', () => {
    it('should return a category by ID', async () => {
      const mockCategory = {
        uuid: '123',
        name: 'Test Category',
        slug: 'test-category',
      };
      prismaService.category.findUnique.mockResolvedValueOnce(mockCategory);

      const result = await categoryService.byId('123');
      expect(result).toEqual(mockCategory);
      expect(prismaService.category.findUnique).toHaveBeenCalledWith({
        where: { uuid: '123' },
        select: returnCategoryObject,
      });
    });

    it('should throw an error if category not found', async () => {
      prismaService.category.findUnique.mockResolvedValueOnce(null);

      await expect(categoryService.byId('123')).rejects.toThrowError(
        'Category not found',
      );
    });
  });

  describe('bySlug', () => {
    it('should return a category by slug', async () => {
      const mockCategory = {
        uuid: '123',
        name: 'Test Category',
        slug: 'test-category',
      };
      prismaService.category.findUnique.mockResolvedValueOnce(mockCategory);

      const result = await categoryService.bySlug('test-category');
      expect(result).toEqual(mockCategory);
      expect(prismaService.category.findUnique).toHaveBeenCalledWith({
        where: { slug: 'test-category' },
        select: returnCategoryObject,
      });
    });

    it('should throw NotFoundException if category not found', async () => {
      prismaService.category.findUnique.mockResolvedValueOnce(null);

      await expect(categoryService.bySlug('test-category')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getAll', () => {
    it('should return all categories', async () => {
      const mockCategories = [
        { uuid: '123', name: 'Category 1', slug: 'category-1' },
      ];
      prismaService.category.findMany.mockResolvedValueOnce(mockCategories);

      const result = await categoryService.getAll();
      expect(result).toEqual({ categories: mockCategories });
      expect(prismaService.category.findMany).toHaveBeenCalledWith({
        select: returnAllCategoryObject,
      });
    });
  });

  describe('createCategory', () => {
    it('should create a new category', async () => {
      const dto: CategoryDto = {
        category_name: 'New Category',
        subcategory_name: 'New Subcategory',
      };
      const mockCategory = {
        uuid: '123',
        name: 'New Category',
        slug: 'new-category',
        subcategory: [],
      };
      (convertToSlug as jest.Mock).mockReturnValue('new-category');
      (uuidGen as jest.Mock).mockReturnValue('123');
      prismaService.category.create.mockResolvedValueOnce(mockCategory);

      const result = await categoryService.createCategory(dto);
      expect(result).toEqual({ category: mockCategory });
      expect(prismaService.category.create).toHaveBeenCalledWith({
        data: {
          uuid: '123',
          name: dto.category_name,
          slug: 'new-category',
        },
        select: {
          name: true,
          slug: true,
          uuid: true,
          subcategory: true,
        },
      });
    });
  });

  describe('updateCategory', () => {
    it('should update an existing category', async () => {
      const dto: CategoryDto = {
        category_name: 'Updated Category',
        subcategory_name: 'Updated Subcategory',
      };
      const mockUpdatedCategory = {
        uuid: '123',
        name: 'Updated Category',
        slug: 'updated-category',
      };
      (convertToSlug as jest.Mock).mockReturnValue('updated-category');
      prismaService.category.update.mockResolvedValueOnce(mockUpdatedCategory);

      const result = await categoryService.updateCategory('123', dto);
      expect(result).toEqual(mockUpdatedCategory);
      expect(prismaService.category.update).toHaveBeenCalledWith({
        where: { uuid: '123' },
        data: {
          name: dto.category_name,
          slug: 'updated-category',
        },
      });
    });
  });

  describe('deleteCategory', () => {
    it('should delete a category and its subcategories', async () => {
      const mockDeletedCategory = {
        uuid: '123',
        name: 'Category to delete',
        slug: 'category-to-delete',
      };
      prismaService.category.delete.mockResolvedValueOnce(mockDeletedCategory);
      prismaService.subcategory.deleteMany.mockResolvedValueOnce({ count: 2 });

      const result = await categoryService.deleteCategory('123');
      expect(result).toEqual(mockDeletedCategory);
      expect(prismaService.category.delete).toHaveBeenCalledWith({
        where: { uuid: '123' },
      });
      expect(prismaService.subcategory.deleteMany).toHaveBeenCalledWith({
        where: { categoryUuid: '123' },
      });
    });
  });
});
