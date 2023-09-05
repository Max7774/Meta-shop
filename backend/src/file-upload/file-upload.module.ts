import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { PrismaService } from 'src/prisma.service';
import { MulterModule } from '@nestjs/platform-express';
import { fileStorage } from './storage';

@Module({
  imports: [MulterModule.register({ storage: fileStorage })],
  controllers: [FileUploadController],
  providers: [FileUploadService, PrismaService],
})
export class FileUploadModule {}
