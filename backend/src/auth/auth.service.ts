import {
  BadGatewayException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { hash, verify } from 'argon2';
import { PrismaService } from 'src/prisma.service';
import { AuthDto } from './dto/auth.dto';
import { uuidGen } from 'src/utils/uuidGenerator';
import { createTransport } from 'nodemailer';
import { generateToken } from 'src/utils/generateToken';
import { Response } from 'express';
import { ResetPasswordType } from './auth.interface';

@Injectable()
export class AuthService {
  private transporter;

  constructor(private prisma: PrismaService, private jwt: JwtService) {
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

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto);

    const tokens = await this.issueTokens(user.uuid);

    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

  async getNewToken(refreshToken: string) {
    const result = await this.jwt.verifyAsync(refreshToken);

    if (!result) throw new UnauthorizedException('Invalid refresh token');

    const user = await this.prisma.user.findUnique({
      where: {
        uuid: result.uuid,
      },
    });

    const tokens = await this.issueTokens(user.uuid);

    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

  async register(dto: AuthDto) {
    const oldUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (oldUser) throw new BadGatewayException('User already exists');

    const verificationToken = generateToken(16);

    const user = await this.prisma.user.create({
      data: {
        uuid: uuidGen(),
        role: 'DEFAULT_USER',
        email: dto.email,
        first_name: dto.first_name,
        second_name: dto.second_name,
        birth_day: dto.birth_day,
        town: dto.town,
        avatarPath: '/uploads/default-avatar.png',
        phone_number: dto.phone_number,
        password: await hash(dto.password),
        verified: false,
        verifyToken: verificationToken,
      },
    });

    const verificationLink = `${process.env.SERVER_URL}/auth/verify/${verificationToken}`;

    await this.transporter.sendMail({
      from: 'mega_ymbetov@mail.ru', // Адрес отправителя
      to: dto.email, // Адрес получателя
      subject: 'Verify your account', // Тема письма
      text: `Please verify your account by clicking the following link: ${verificationLink}`, // Текст письма
    });

    const tokens = await this.issueTokens(user.uuid);

    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

  async createUser(dto: AuthDto) {
    const oldUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (oldUser) throw new BadGatewayException('Такой пользователь уже есть');

    const user = await this.prisma.user.create({
      data: {
        uuid: uuidGen(),
        role: dto.role,
        email: dto.email,
        first_name: dto.first_name,
        second_name: dto.second_name,
        birth_day: dto.birth_day,
        town: dto.town,
        avatarPath: '/uploads/default-avatar.png',
        phone_number: dto.phone_number,
        password: await hash(dto.password),
        verified: true,
      },
    });

    return user;
  }

  async verifyToken(verifyToken: string, res: Response) {
    const user = await this.prisma.user.findUnique({
      where: {
        verifyToken,
      },
    });

    if (!user) throw new NotFoundException('User not found!');

    await this.prisma.user.update({
      where: {
        verifyToken,
      },
      data: {
        verified: true,
        verifyToken: null,
      },
    });

    return res.redirect('/');
  }

  private async issueTokens(userUuid: string) {
    const data = { uuid: userUuid };

    const accessToken = this.jwt.sign(data, {
      expiresIn: '1h',
    });

    const refreshToken = this.jwt.sign(data, {
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  private returnUserFields(user: User) {
    return {
      verified: user.verified,
      uuid: user.uuid,
      email: user.email,
      role: user.role,
    };
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    const isValid = await verify(user.password, dto.password);

    if (!isValid) throw new UnauthorizedException('Invalid password');

    return user;
  }

  async resetPassword(email: string) {
    const resetToken = generateToken(16);

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    await this.prisma.user.update({
      where: {
        email,
      },
      data: {
        verified: false,
        verifyToken: resetToken,
      },
    });

    await this.transporter.sendMail({
      from: 'mega_ymbetov@mail.ru', // Адрес отправителя
      to: email, // Адрес получателя
      subject: 'Reset password', // Тема письма
      text: `Token to reset your password: ${resetToken}`, // Текст письма
    });

    return 'OK';
  }

  async updatePassword(body: ResetPasswordType) {
    const user = await this.prisma.user.findUnique({
      where: {
        verifyToken: body.resetToken,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    const isValid = verify(user.password, body.old_pass);

    if (!isValid) throw new UnauthorizedException('Invalid password');

    await this.prisma.user.update({
      where: {
        uuid: user.uuid,
      },
      data: {
        password: await hash(body.new_pass),
        verified: true,
        verifyToken: null,
      },
    });

    return 'OK';
  }
}
