import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { hash } from 'argon2';
import { PrismaService } from 'src/prisma.service';
import { UserDto } from './dto/user.dto';
import { returnUserObject } from './return-user-object';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async byId(uuid: string, selectObject: Prisma.UserSelect = {}) {
    const user = await this.prisma.user.findUnique({
      where: {
        uuid,
      },
      select: {
        ...returnUserObject,
        favorites: {
          select: {
            uuid: true,
            name: true,
            price: true,
            images: true,
            slug: true,
            category: {
              select: {
                slug: true,
              },
            },
            reviews: true,
          },
        },
        currentAddress: true,
        addresses: true,
        orders: true,
        ...selectObject,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async updateProfile(uuid: string, dto: UserDto) {
    const isSameUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (isSameUser && uuid !== isSameUser.uuid)
      throw new BadRequestException('Email already in use');

    const user = await this.byId(uuid);

    return this.prisma.user.update({
      where: {
        uuid,
      },
      data: {
        email: dto.email,
        first_name: dto.first_name,
        avatarPath: dto.avatarPath,
        phone_number: dto.phone_number,
        password: dto.password ? await hash(dto.password) : user.password,
      },
    });
  }

  async toggleFavourite(uuid: string, productUuid: string) {
    const user = await this.byId(uuid);

    if (!user) throw new NotFoundException('User not found');

    const isExists = user.favorites.some(
      (product) => product.uuid === productUuid,
    );

    await this.prisma.user.update({
      where: {
        uuid: user.uuid,
      },
      data: {
        favorites: {
          [isExists ? 'disconnect' : 'connect']: {
            id: productUuid,
          },
        },
      },
    });

    return 'Success';
  }
}
