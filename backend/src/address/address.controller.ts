import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { Address } from './entities/address.entity';

@Controller('address')
@ApiTags('Address')
@ApiBearerAuth()
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth(['DEFAULT_USER'])
  @Post()
  @ApiOperation({ summary: 'Создать новый адрес' })
  @ApiResponse({
    status: 200,
    description: 'Адрес успешно создан.',
    type: Address,
  })
  @ApiResponse({ status: 400, description: 'Неверные данные.' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован.' })
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
  @ApiOperation({ summary: 'Получить все адреса пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Список всех адресов пользователя.',
    type: [Address],
  })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован.' })
  async findAll(@CurrentUser('uuid') userUuid: string) {
    return await this.addressService.findAll(userUuid);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth(['DEFAULT_USER'])
  @Get(':addressUuid')
  @ApiOperation({ summary: 'Получить один адрес и установить его как текущий' })
  @ApiParam({ name: 'addressUuid', description: 'UUID адреса', type: String })
  @ApiResponse({
    status: 200,
    description: 'Адрес успешно установлен как текущий.',
    type: Address,
  })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован.' })
  @ApiResponse({ status: 404, description: 'Адрес не найден.' })
  async findOne(
    @Param('addressUuid') addressUuid: string,
    @CurrentUser('uuid') userUuid: string,
  ) {
    return await this.addressService.setCurrentAddress(addressUuid, userUuid);
  }
}
