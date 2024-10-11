import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { PrismaService } from 'src/prisma.service';
import { uuidGen } from 'src/utils/uuidGenerator';

@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService) {}

  async create(createAddressDto: CreateAddressDto, userUuid: string) {
    try {
      const address = await this.prisma.address.create({
        data: {
          uuid: uuidGen(),
          ...createAddressDto,
          user: {
            connect: {
              uuid: userUuid,
            },
          },
        },
      });

      await this.prisma.user.update({
        where: {
          uuid: userUuid,
        },
        data: {
          currentAddress: address.uuid,
        },
      });

      return address;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll(userUuid: string) {
    return await this.prisma.address.findMany({
      where: {
        user: {
          uuid: userUuid,
        },
      },
    });
  }

  async setCurrentAddress(addressUuid: string, userUuid: string) {
    try {
      const result = await this.prisma.user.update({
        where: {
          uuid: userUuid,
        },
        data: {
          currentAddress: addressUuid,
        },
      });

      return result.currentAddress;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
