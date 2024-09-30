import { EnumOrderItemStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class AddressItemDto {
  @IsString()
  uuid: string;

  @IsString()
  town: string;

  @IsString()
  street: string;

  @IsString()
  house: string;

  @IsOptional()
  @IsString()
  apartment?: string;

  @IsOptional()
  @IsString()
  intercom?: string;

  @IsOptional()
  @IsString()
  entrance?: string;

  @IsOptional()
  @IsString()
  floor?: string;
}

export class OrderDto {
  @IsOptional()
  @IsString()
  uuid: string;

  @IsOptional()
  @IsEnum(EnumOrderItemStatus)
  status: EnumOrderItemStatus;

  @IsOptional()
  @IsString()
  comment: string;

  @IsOptional()
  @IsString()
  first_name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @IsString()
  addressUuid: string;
}

export class OrderItemDto {
  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;

  @IsString()
  productUuid: string;
}
