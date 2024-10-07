import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';

@Controller('address')
@ApiTags('Address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth(['DEFAULT_USER'])
  @Post()
  async create(
    @Body() createAddressDto: CreateAddressDto,
    @CurrentUser('uuid') userUuid: string,
  ) {
    return await this.addressService.create(createAddressDto, userUuid);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth(['DEFAULT_USER'])
  @Get()
  async findAll(@CurrentUser('uuid') userUuid: string) {
    return await this.addressService.findAll(userUuid);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth(['DEFAULT_USER'])
  @Get(':addressUuid')
  async findOne(
    @Param('addressUuid') addressUuid: string,
    @CurrentUser('uuid') userUuid: string,
  ) {
    return await this.addressService.setCurrentAddress(addressUuid, userUuid);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(+id, updateAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressService.remove(+id);
  }
}
