import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService } from 'src/prisma.service';
import { QRCodeService } from 'src/qrcode/qrcode.service';
import { MulterModule } from '@nestjs/platform-express';
import { fileStorage } from './storage';

@Module({
  imports: [MulterModule.register({ storage: fileStorage })],
  controllers: [OrderController],
  providers: [OrderService, PrismaService, QRCodeService],
})
export class OrderModule {}
