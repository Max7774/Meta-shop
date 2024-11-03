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
import { AuthDto, AuthLoginDto } from './dto/auth.dto';
import { uuidGen } from 'src/utils/uuidGenerator';
import { createTransport } from 'nodemailer';
import { generateToken } from 'src/utils/generateToken';
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

  async login(dto: AuthLoginDto) {
    const user = await this.validateUser(dto);

    const tokens = await this.issueTokens(user.uuid);

    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

  async getNewToken(refreshToken: string) {
    try {
      const result = this.jwt.verify(refreshToken);

      const user = await this.prisma.user.findUnique({
        where: {
          uuid: result.uuid,
        },
      });

      const { accessToken } = await this.issueTokens(user.uuid);

      return {
        user: this.returnUserFields(user),
        accessToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async verifyAccessToken(accessToken: string) {
    try {
      const result = this.jwt.verify(accessToken);
      const { role } = await this.prisma.user.findUnique({
        where: {
          uuid: result.uuid,
        },
      });
      return role;
    } catch (error) {
      throw new UnauthorizedException('Invalid access token');
    }
  }

  async register(dto: AuthDto) {
    const oldUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (oldUser) throw new BadGatewayException('User already exists');

    const verificationToken = generateToken(16);

    await this.prisma.user.create({
      data: {
        uuid: uuidGen(),
        role: 'DEFAULT_USER',
        email: dto.email,
        first_name: dto.first_name,
        second_name: dto.second_name,
        birth_day: dto.birth_day,
        avatarPath: 'default-avatar.png',
        phone_number: dto.phone_number,
        password: await hash(dto.password),
        currentAddress: '',
        verified: false,
        verifyToken: verificationToken,
      },
    });

    await this.transporter.sendMail({
      from: process.env.MAILDEV_INCOMING_USER,
      to: dto.email,
      subject: 'Подтверждение аккаунта',
      text: `Пожалуйста, подтвердите свой аккаунт с помощью кода подтверждения: ${verificationToken}`,
    });

    return 'Success';
  }

  async phoneRegister(data: { phone_number: string }) {
    const oldUser = await this.prisma.user.findUnique({
      where: {
        phone_number: data.phone_number,
      },
    });

    if (oldUser) {
      if (oldUser.role === 'ADMIN') {
        throw new BadGatewayException('This number is invalid');
      }

      const tokens = await this.issueTokens(oldUser.uuid);

      return {
        user: this.returnUserFields(oldUser),
        ...tokens,
      };
    }

    const temporaryPassword = generateToken(5);

    const newUser = await this.prisma.user.create({
      data: {
        uuid: uuidGen(),
        role: 'DEFAULT_USER',
        email: `tmp_email_${temporaryPassword}@gmail.com`,
        first_name: '',
        second_name: '',
        birth_day: '',
        currentAddress: '',
        avatarPath: 'default-avatar.png',
        phone_number: data.phone_number,
        password: await hash(`${temporaryPassword}`),
        verified: false,
        verifyToken: null,
      },
    });

    await this.transporter.sendMail({
      from: process.env.MAILDEV_INCOMING_USER,
      to: process.env.MAILDEV_AUDIT_USER,
      subject: 'Регистрация пользователя',
      text: `Зарегистрировался новый пользователь под номером телефона: ${data.phone_number}`,
    });

    const tokens = await this.issueTokens(newUser.uuid);

    return {
      user: this.returnUserFields(newUser),
      ...tokens,
    };
  }

  async verifyToken(verifyToken: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        verifyToken,
      },
    });

    if (!user) throw new NotFoundException('User not found!');

    const updatedUser = await this.prisma.user.update({
      where: {
        verifyToken,
      },
      data: {
        verified: true,
        verifyToken: null,
      },
    });

    const tokens = await this.issueTokens(updatedUser.uuid);

    return {
      user: this.returnUserFields(updatedUser),
      ...tokens,
    };
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
      companyUuid: user?.companyUuid,
    };
  }

  private async validateUser(dto: AuthLoginDto) {
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
      from: process.env.MAILDEV_INCOMING_USER, // Адрес отправителя
      to: email, // Адрес получателя
      subject: 'Сброс пароля', // Тема письма
      text: `Код для сброса пароля: ${resetToken}`, // Текст письма
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
