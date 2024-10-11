import { Test, TestingModule } from '@nestjs/testing';
import { SubcategoryController } from './subcategory.controller';
import { SubcategoryService } from './subcategory.service';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { HttpException } from '@nestjs/common';
import { promises as fs } from 'fs';

jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  promises: {
    unlink: jest.fn(),
  },
}));

describe('SubcategoryController', () => {
  let controller: SubcategoryController;
  let service: SubcategoryService;
  let module: TestingModule;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubcategoryController],
      providers: [
        {
          provide: SubcategoryService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SubcategoryController>(SubcategoryController);
    service = module.get<SubcategoryService>(SubcategoryService);
  });

  afterEach(async () => {
    await module?.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new subcategory', async () => {
      const createSubcategoryDto: CreateSubcategoryDto = {
        name: 'New Subcategory',
        categoryUuid: 'category-uuid',
      };
      const mockSubcategory = {
        uuid: 'new-uuid',
        name: 'New Subcategory',
        slug: 'new-subcategory',
        createdAt: new Date(),
        updatedAt: new Date(),
        icon: 'new-icon.png',
        categoryUuid: 'category-uuid',
      };

      jest.spyOn(service, 'create').mockResolvedValue(mockSubcategory);

      const result = await controller.create(createSubcategoryDto);
      expect(result).toEqual(mockSubcategory);
      expect(service.create).toHaveBeenCalledWith(createSubcategoryDto);
    });
  });

  describe('findAll', () => {
    it('should return all subcategories for a given categoryUuid', async () => {
      const categoryUuid = 'category-uuid';
      const mockSubcategories = [
        {
          uuid: '123',
          name: 'Subcategory 1',
          slug: 'subcategory-1',
          createdAt: new Date(),
          updatedAt: new Date(),
          icon: 'icon1.png',
          categoryUuid: 'category-uuid',
          category: {
            uuid: 'category-uuid',
            name: 'Category',
            createdAt: new Date(),
            updatedAt: new Date(),
            slug: 'category-slug',
            icon: 'category-icon.png',
          },
          products: [],
          _count: {
            products: 2,
            category: 1,
          },
        },
        {
          uuid: '456',
          name: 'Subcategory 2',
          slug: 'subcategory-2',
          createdAt: new Date(),
          updatedAt: new Date(),
          icon: 'icon2.png',
          categoryUuid: 'category-uuid',
          category: {
            uuid: 'category-uuid',
            name: 'Category',
            createdAt: new Date(),
            updatedAt: new Date(),
            slug: 'category-slug',
            icon: 'category-icon.png',
          },
          products: [],
          _count: {
            products: 0,
            category: 1,
          },
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue({
        categoryUuid,
        subcategories: mockSubcategories,
      });

      const result = await controller.findAll(categoryUuid);
      expect(result).toEqual({
        categoryUuid,
        subcategories: mockSubcategories,
      });
      expect(service.findAll).toHaveBeenCalledWith(categoryUuid);
    });
  });

  describe('remove', () => {
    it('should remove a subcategory and delete the icon file', async () => {
      const uuid = 'subcategory-uuid';
      const mockSubcategory = {
        uuid,
        name: 'Subcategory to Delete',
        slug: 'subcategory-to-delete',
        icon: 'delete-icon.png',
        categoryUuid: 'category-uuid',
        createdAt: new Date(),
        updatedAt: new Date(),
        category: {
          uuid: 'category-uuid',
          name: 'Category',
          createdAt: new Date(),
          updatedAt: new Date(),
          slug: 'category-slug',
          icon: 'category-icon.png',
        },
        products: [],
        _count: {
          products: 0,
          category: 1,
        },
      };

      jest.spyOn(service, 'remove').mockResolvedValue(mockSubcategory);
      const unlinkSpy = jest.spyOn(fs, 'unlink').mockResolvedValue(undefined);

      const result = await controller.remove(uuid);
      expect(result).toEqual(mockSubcategory);
      expect(service.remove).toHaveBeenCalledWith(uuid);
      expect(unlinkSpy).toHaveBeenCalledWith(
        `${process.env.DESTINATION}/delete-icon.png`,
      );
    });

    it('should throw an HttpException if file is not found', async () => {
      const uuid = 'subcategory-uuid';
      jest
        .spyOn(service, 'remove')
        .mockRejectedValue(new Error('Deletion failed'));

      await expect(controller.remove(uuid)).rejects.toThrow(HttpException);
      await expect(controller.remove(uuid)).rejects.toThrow('Файл не найден');
    });
  });
});
