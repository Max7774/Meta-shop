import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateClaimDto } from './dto/create-claim.dto';
import { createTransport, Transporter } from 'nodemailer';
import { PrismaService } from 'src/prisma.service';
import { uuidGen } from 'src/utils/uuidGenerator';

@Injectable()
export class ClaimsService {
  private transporter: Transporter;

  constructor(private prisma: PrismaService) {
    this.transporter = createTransport({
      pool: true,
      host: 'smtp.mail.ru',
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAILDEV_INCOMING_USER,
        pass: process.env.MAILDEV_INCOMING_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async create(createClaimDto: CreateClaimDto) {
    try {
      await this.transporter.sendMail({
        from: process.env.MAILDEV_INCOMING_USER,
        to: process.env.MAILDEV_AUDIT_USER,
        subject: 'Новая заявка',
        text: `У вас новая заявка! Вот email: ${createClaimDto.email}. Тип: ${createClaimDto.type}. Текст: ${createClaimDto.text}`,
      });

      return await this.prisma.claims.create({
        data: {
          uuid: uuidGen(),
          email: createClaimDto.email,
          text: createClaimDto.text,
          phone: createClaimDto.phone || '',
          claimType: createClaimDto.type,
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll() {
    try {
      return await this.prisma.claims.findMany();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
