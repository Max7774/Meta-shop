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

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}

export class OrderItemDto {
  @IsString()
  uuid: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;

  @IsString()
  productUuid: string;
}
