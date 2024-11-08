import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { promises as fs } from 'fs';
import * as path from 'path';
import { roles } from 'src/constants/roles';

const { user, company, manager, admin } = roles;

@Controller('file-upload')
@ApiTags('File-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth([admin, manager, company])
  @Post('create/:uuid')
  @UseInterceptors(FilesInterceptor('files'))
  async createProduct(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 })],
      }),
    )
    file: Express.Multer.File[],
    @Param() uuid: { uuid: string },
  ) {
    return this.fileUploadService.uploadFiles(file, uuid);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth([admin, manager, company])
  @Post('create/subcategory/icon/:subcategoryUuid')
  @UseInterceptors(FileInterceptor('file'))
  async createIcon(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 })],
      }),
    )
    file: Express.Multer.File,
    @Param('subcategoryUuid') subcategoryUuid: string,
  ) {
    return this.fileUploadService.uploadFile(file, subcategoryUuid);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth([admin, manager, company])
  @Post('create/company/logo/:companyUuid')
  @UseInterceptors(FileInterceptor('file'))
  async createLogo(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 })],
      }),
    )
    file: Express.Multer.File,
    @Param('companyUuid') companyUuid: string,
  ) {
    return this.fileUploadService.createLogo(file, companyUuid);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth([user, admin, manager, company])
  @Post('update/user/avatar')
  @UseInterceptors(FileInterceptor('file'))
  async updateAvatar(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 })],
      }),
    )
    file: Express.Multer.File,
    @CurrentUser('uuid') uuid: string,
  ) {
    return this.fileUploadService.updateAvatar(file, uuid);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth([admin, manager, company])
  @Delete(':fileName/:productUuid')
  async deleteFile(
    @Param('fileName') fileName: string,
    @Param('productUuid') productUuid: string,
  ): Promise<any> {
    if (!process.env.DESTINATION) {
      throw new HttpException(
        'Переменная окружения DESTINATION не настроена',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const baseDirectory = path.resolve(process.env.DESTINATION);
    const filePath = path.join(baseDirectory, fileName);

    try {
      const result = await this.fileUploadService.deleteImageInProduct(
        productUuid,
        fileName,
      );

      if (result) {
        await fs.unlink(filePath);
        return { message: 'Файл успешно удален' };
      } else {
        return { message: 'Ошибка удаления файла' };
      }
    } catch (err) {
      throw new HttpException('Файл не найден', HttpStatus.NOT_FOUND);
    }
  }

  @Get(':fileName')
  async serveFile(
    @Param('fileName') fileName: string,
    @Res() res: any,
  ): Promise<any> {
    res.sendFile(fileName, { root: process.env.DESTINATION });
  }
}
