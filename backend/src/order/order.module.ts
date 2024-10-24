import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService } from 'src/prisma.service';
import { QRCodeService } from 'src/qrcode/qrcode.service';
import { MulterModule } from '@nestjs/platform-express';
import { fileStorage } from './storage';
import { MailerModule } from '@nestjs-modules/mailer';
import { BotService } from 'src/bot/bot.service';

@Module({
  imports: [
    MulterModule.register({ storage: fileStorage }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.mail.ru',
        port: 465,
        secure: true,
        auth: {
          user: process.env.MAILDEV_INCOMING_USER,
          pass: process.env.MAILDEV_INCOMING_PASS,
        },
      },
    }),
  ],
  controllers: [OrderController],
  providers: [OrderService, PrismaService, QRCodeService, BotService],
})
export class OrderModule {}
