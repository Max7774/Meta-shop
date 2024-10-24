import { Test, TestingModule } from '@nestjs/testing';
import { FileUploadService } from './file-upload.service';
import { PrismaService } from 'src/prisma.service';
import { BadGatewayException } from '@nestjs/common';
import { uuidGen } from 'src/utils/uuidGenerator';
import * as dotenv from 'dotenv';
import { MockContext, createMockContext } from 'src/test-utils/prisma.mock';

dotenv.config();

jest.mock('src/utils/uuidGenerator');
const mockUuidGen = uuidGen as jest.Mock;

describe('FileUploadService', () => {
  let service: FileUploadService;
  let mockCtx: MockContext;

  beforeEach(async () => {
    mockCtx = createMockContext();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FileUploadService,
        { provide: PrismaService, useValue: mockCtx.prisma },
      ],
    }).compile();

    service = module.get<FileUploadService>(FileUploadService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('uploadFiles', () => {
    it('should upload multiple files and update product images', async () => {
      const mockFiles = [
        {
          filename: 'file1.png',
          mimetype: 'image/png',
          originalname: 'file1.png',
          size: 1234,
          path: 'path/to/file1.png',
        },
      ] as Express.Multer.File[];

      const mockProduct = {
        uuid: 'product-uuid',
        images: ['existing-image.png'],
      };

      mockUuidGen.mockReturnValue('new-uuid');
      mockCtx.prisma.photoFile.create = jest
        .fn()
        .mockResolvedValue({ filename: 'file1.png' });
      mockCtx.prisma.product.findUnique = jest
        .fn()
        .mockResolvedValue(mockProduct);
      mockCtx.prisma.product.update = jest.fn().mockResolvedValue({});

      const result = await service.uploadFiles(mockFiles, {
        uuid: 'product-uuid',
      });

      expect(result).toEqual(['file1.png']);
      expect(mockCtx.prisma.photoFile.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          filename: 'file1.png',
          productUuid: 'product-uuid',
        }),
      });
      expect(mockCtx.prisma.product.update).toHaveBeenCalledWith({
        where: { uuid: 'product-uuid' },
        data: {
          images: ['existing-image.png', 'file1.png'],
        },
      });
    });
  });

  describe('uploadFile', () => {
    it('should upload a file and update subcategory icon', async () => {
      const mockFile = {
        filename: 'icon.png',
        mimetype: 'image/png',
        originalname: 'icon.png',
        size: 1234,
        path: 'path/to/icon.png',
      } as Express.Multer.File;

      mockUuidGen.mockReturnValue('new-uuid');
      mockCtx.prisma.photoFile.create = jest
        .fn()
        .mockResolvedValue({ filename: 'icon.png' });
      mockCtx.prisma.subcategory.update = jest.fn().mockResolvedValue({});

      const result = await service.uploadFile(mockFile, 'subcategory-uuid');

      expect(result).toEqual('icon.png');
      expect(mockCtx.prisma.photoFile.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          filename: 'icon.png',
          subcategoryUuid: 'subcategory-uuid',
        }),
      });
      expect(mockCtx.prisma.subcategory.update).toHaveBeenCalledWith({
        where: { uuid: 'subcategory-uuid' },
        data: { icon: 'icon.png' },
      });
    });
  });

  describe('updateAvatar', () => {
    it('should update user avatar', async () => {
      const mockFile = {
        filename: 'avatar.png',
      } as Express.Multer.File;

      mockCtx.prisma.user.update = jest
        .fn()
        .mockResolvedValue({ avatarPath: 'avatar.png' });

      const result = await service.updateAvatar(mockFile, 'user-uuid');

      expect(result).toEqual('avatar.png');
      expect(mockCtx.prisma.user.update).toHaveBeenCalledWith({
        where: { uuid: 'user-uuid' },
        data: { avatarPath: 'avatar.png' },
      });
    });

    it('should throw BadGatewayException if update fails', async () => {
      const mockFile = {
        filename: 'avatar.png',
      } as Express.Multer.File;

      mockCtx.prisma.user.update = jest
        .fn()
        .mockRejectedValue(new Error('Update failed'));

      await expect(service.updateAvatar(mockFile, 'user-uuid')).rejects.toThrow(
        BadGatewayException,
      );
    });
  });

  describe('deleteImageInProduct', () => {
    it('should delete an image from product and add default if no images left', async () => {
      const mockProduct = {
        uuid: 'product-uuid',
        images: ['image1.png'],
      };

      mockCtx.prisma.product.findUnique = jest
        .fn()
        .mockResolvedValue(mockProduct);
      mockCtx.prisma.product.update = jest.fn().mockResolvedValue({});

      const result = await service.deleteImageInProduct(
        'product-uuid',
        'image1.png',
      );

      expect(result).toEqual(true);
      expect(mockCtx.prisma.product.update).toHaveBeenCalledWith({
        where: { uuid: 'product-uuid' },
        data: {
          images: ['default-product-photo.png'],
        },
      });
    });

    it('should delete an image from product without adding default if images remain', async () => {
      const mockProduct = {
        uuid: 'product-uuid',
        images: ['image1.png', 'image2.png'],
      };

      mockCtx.prisma.product.findUnique = jest
        .fn()
        .mockResolvedValue(mockProduct);
      mockCtx.prisma.product.update = jest.fn().mockResolvedValue({});

      const result = await service.deleteImageInProduct(
        'product-uuid',
        'image1.png',
      );

      expect(result).toEqual(true);
      expect(mockCtx.prisma.product.update).toHaveBeenCalledWith({
        where: { uuid: 'product-uuid' },
        data: {
          images: ['image2.png'],
        },
      });
    });

    it('should throw BadGatewayException if delete fails', async () => {
      mockCtx.prisma.product.findUnique = jest
        .fn()
        .mockRejectedValue(new Error('Delete failed'));

      await expect(
        service.deleteImageInProduct('product-uuid', 'image1.png'),
      ).rejects.toThrow(BadGatewayException);
    });
  });
});
