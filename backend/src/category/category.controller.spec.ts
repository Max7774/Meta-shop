import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
import { NotFoundException } from '@nestjs/common';

const mockCategoryService = () => ({
  getAll: jest.fn(),
  bySlug: jest.fn(),
  byId: jest.fn(),
  createCategory: jest.fn(),
  updateCategory: jest.fn(),
  deleteCategory: jest.fn(),
});

type MockCategoryService = ReturnType<typeof mockCategoryService>;

describe('CategoryController', () => {
  let categoryController: CategoryController;
  let categoryService: MockCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        { provide: CategoryService, useFactory: mockCategoryService },
      ],
    }).compile();

    categoryController = module.get<CategoryController>(CategoryController);
    categoryService = module.get(CategoryService);
  });

  it('should be defined', () => {
    expect(categoryController).toBeDefined();
  });

  describe('getAll', () => {
    it('should return all categories', async () => {
      const mockCategories = [
        { uuid: '123', name: 'Category 1', slug: 'category-1' },
      ];
      categoryService.getAll.mockResolvedValueOnce({
        categories: mockCategories,
      });

      const result = await categoryController.getAll();
      expect(result).toEqual({ categories: mockCategories });
      expect(categoryService.getAll).toHaveBeenCalled();
    });
  });

  describe('bySlug', () => {
    it('should return a category by slug', async () => {
      const mockCategory = {
        uuid: '123',
        name: 'Test Category',
        slug: 'test-category',
      };
      categoryService.bySlug.mockResolvedValueOnce(mockCategory);

      const result = await categoryController.bySlug('test-category');
      expect(result).toEqual(mockCategory);
      expect(categoryService.bySlug).toHaveBeenCalledWith('test-category');
    });

    it('should throw NotFoundException if category not found', async () => {
      categoryService.bySlug.mockRejectedValueOnce(
        new NotFoundException('Category not found'),
      );

      await expect(categoryController.bySlug('unknown-slug')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('byId', () => {
    it('should return a category by ID', async () => {
      const mockCategory = {
        uuid: '123',
        name: 'Test Category',
        slug: 'test-category',
      };
      categoryService.byId.mockResolvedValueOnce(mockCategory);

      const result = await categoryController.byId('123');
      expect(result).toEqual(mockCategory);
      expect(categoryService.byId).toHaveBeenCalledWith('123');
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
      categoryService.createCategory.mockResolvedValueOnce({
        category: mockCategory,
      });

      const result = await categoryController.createCategory(dto);
      expect(result).toEqual({ category: mockCategory });
      expect(categoryService.createCategory).toHaveBeenCalledWith(dto);
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
      categoryService.updateCategory.mockResolvedValueOnce(mockUpdatedCategory);

      const result = await categoryController.updateCategory('123', dto);
      expect(result).toEqual(mockUpdatedCategory);
      expect(categoryService.updateCategory).toHaveBeenCalledWith('123', dto);
    });
  });

  describe('deleteCategory', () => {
    it('should delete a category', async () => {
      const mockDeletedCategory = {
        uuid: '123',
        name: 'Category to delete',
        slug: 'category-to-delete',
      };
      categoryService.deleteCategory.mockResolvedValueOnce(mockDeletedCategory);

      const result = await categoryController.deleteCategory('123');
      expect(result).toEqual(mockDeletedCategory);
      expect(categoryService.deleteCategory).toHaveBeenCalledWith('123');
    });
  });
});
