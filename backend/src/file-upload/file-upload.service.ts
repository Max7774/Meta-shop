import { BadGatewayException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { uuidGen } from 'src/utils/uuidGenerator';

@Injectable()
export class FileUploadService {
  constructor(private readonly prismaFileService: PrismaService) {}

  async uploadFiles(
    files: Express.Multer.File[],
    productUuid: { uuid: string },
  ) {
    const promises = files.map(async (file) => {
      const { filename, mimetype, originalname, size, path } = file;
      const url = `${process.env.SERVER_URL}/file-upload/${filename}`;

      const result = await this.prismaFileService.photoFile.create({
        data: {
          uuid: uuidGen(),
          url,
          filename,
          mimetype,
          originalname,
          size,
          path,
          productUuid: productUuid.uuid,
        },
      });
      return result.filename;
    });

    const product = await this.prismaFileService.product.findUnique({
      where: { uuid: productUuid.uuid },
    });

    const urls = await Promise.all(promises);

    await this.prismaFileService.product.update({
      where: {
        uuid: productUuid.uuid,
      },
      data: {
        images: [...product.images, ...urls].filter(
          (imageUrl) => !imageUrl.includes(`default-product-photo.png`),
        ),
      },
    });

    return urls;
  }

  async uploadFile(file: Express.Multer.File, categoryUuid: { uuid: string }) {
    const { filename, mimetype, originalname, size, path } = file;
    const url = `${process.env.SERVER_URL}/file-upload/${filename}`;

    const result = await this.prismaFileService.photoFile.create({
      data: {
        uuid: uuidGen(),
        url,
        filename,
        mimetype,
        originalname,
        size,
        path,
        categoryUuid: categoryUuid.uuid,
      },
    });

    await this.prismaFileService.category.update({
      where: {
        uuid: categoryUuid.uuid,
      },
      data: {
        icon: result.url,
      },
    });
    return result.url;
  }

  async updateAvatar(file: Express.Multer.File, uuid: string) {
    try {
      const result = await this.prismaFileService.user.update({
        where: {
          uuid,
        },
        data: {
          avatarPath: file.filename,
        },
      });

      return result.avatarPath;
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async deleteImageInProduct(productUuid: string, filename: string) {
    try {
      const product = await this.prismaFileService.product.findUnique({
        where: {
          uuid: productUuid,
        },
      });

      const result = product.images.filter((image) => image !== filename);

      await this.prismaFileService.product.update({
        where: {
          uuid: productUuid,
        },
        data: {
          images: result,
        },
      });

      return true;
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
}
