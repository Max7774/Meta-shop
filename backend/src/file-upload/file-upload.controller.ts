import {
  Controller,
  Get,
  HttpCode,
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

@Controller('file-upload')
@ApiTags('File-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth('ADMIN' || 'MANAGER')
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
  @Auth('ADMIN' || 'MANAGER')
  @Post('create/category/icon/:uuid')
  @UseInterceptors(FileInterceptor('file'))
  async createIcon(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 })],
      }),
    )
    file: Express.Multer.File,
    @Param() uuid: { uuid: string },
  ) {
    return this.fileUploadService.uploadFile(file, uuid);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth('DEFAULT_USER')
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

  @Get(':fileName')
  async serveFile(
    @Param('fileName') fileName: string,
    @Res() res: any,
  ): Promise<any> {
    res.sendFile(fileName, { root: 'uploads' });
  }
}
