import { Test, TestingModule } from '@nestjs/testing';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { createMock } from '@golevelup/ts-jest';
import { promises as fs } from 'fs';
import * as path from 'path';

jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  promises: {
    unlink: jest.fn(),
  },
}));
describe('FileUploadController', () => {
  let controller: FileUploadController;
  let service: FileUploadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileUploadController],
      providers: [
        {
          provide: FileUploadService,
          useValue: {
            uploadFiles: jest.fn(),
            uploadFile: jest.fn(),
            updateAvatar: jest.fn(),
            deleteImageInProduct: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<FileUploadController>(FileUploadController);
    service = module.get<FileUploadService>(FileUploadService);
    process.env.DESTINATION = './uploads';
  });

  afterEach(() => {
    delete process.env.DESTINATION;
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createProduct', () => {
    it('should upload multiple files and return their filenames', async () => {
      const mockFiles = [createMock<Express.Multer.File>()];
      const mockUuid = { uuid: 'product-uuid' };
      jest.spyOn(service, 'uploadFiles').mockResolvedValue(['file1.png']);

      const result = await controller.createProduct(mockFiles, mockUuid);

      expect(result).toEqual(['file1.png']);
      expect(service.uploadFiles).toHaveBeenCalledWith(mockFiles, mockUuid);
    });
  });

  describe('createIcon', () => {
    it('should upload a file and return its filename', async () => {
      const mockFile = createMock<Express.Multer.File>();
      const mockSubcategoryUuid = 'subcategory-uuid';
      jest.spyOn(service, 'uploadFile').mockResolvedValue('icon.png');

      const result = await controller.createIcon(mockFile, mockSubcategoryUuid);

      expect(result).toEqual('icon.png');
      expect(service.uploadFile).toHaveBeenCalledWith(
        mockFile,
        mockSubcategoryUuid,
      );
    });
  });

  describe('updateAvatar', () => {
    it('should update the user avatar and return the filename', async () => {
      const mockFile = createMock<Express.Multer.File>();
      const mockUuid = 'user-uuid';
      jest.spyOn(service, 'updateAvatar').mockResolvedValue('avatar.png');

      const result = await controller.updateAvatar(mockFile, mockUuid);

      expect(result).toEqual('avatar.png');
      expect(service.updateAvatar).toHaveBeenCalledWith(mockFile, mockUuid);
    });
  });

  describe('deleteFile', () => {
    it('should delete a file and return a success message', async () => {
      const mockFileName = 'file1.png';
      const mockProductUuid = 'product-uuid';
      jest.spyOn(service, 'deleteImageInProduct').mockResolvedValue(true);
      jest.spyOn(fs, 'unlink').mockResolvedValue();

      const result = await controller.deleteFile(mockFileName, mockProductUuid);

      const expectedFilePath = path.resolve(
        process.env.DESTINATION,
        mockFileName,
      );

      expect(result).toEqual({ message: 'Файл успешно удален' });
      expect(service.deleteImageInProduct).toHaveBeenCalledWith(
        mockProductUuid,
        mockFileName,
      );
      expect(fs.unlink).toHaveBeenCalledWith(expectedFilePath);
    });

    it('should throw an HttpException if file is not found', async () => {
      const mockFileName = 'file1.png';
      const mockProductUuid = 'product-uuid';
      jest
        .spyOn(service, 'deleteImageInProduct')
        .mockRejectedValue(new Error('Delete failed'));

      await expect(
        controller.deleteFile(mockFileName, mockProductUuid),
      ).rejects.toThrow(
        new HttpException('Файл не найден', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('serveFile', () => {
    it('should serve the requested file', async () => {
      const mockFileName = 'file1.png';
      const mockRes = { sendFile: jest.fn() };

      await controller.serveFile(mockFileName, mockRes);

      expect(mockRes.sendFile).toHaveBeenCalledWith(mockFileName, {
        root: process.env.DESTINATION,
      });
    });
  });
});
