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
  town: string;

  @IsOptional()
  @IsString()
  first_name: string;

  @IsOptional()
  @IsString()
  second_name: string;

  @IsString()
  addressLine1: string;

  @IsOptional()
  @IsString()
  addressLine2: string;

  @IsOptional()
  @IsString()
  postalCode: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}

export class OrderItemDto {
  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;

  @IsString()
  productUuid: string;
}
