import { Prisma } from '@prisma/client';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ProductDto implements Prisma.ProductUpdateInput {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  description: string;

  @IsString()
  categoryUuid: string;

  @IsString()
  subcategoryUuid: string;

  @IsString()
  peculiarities: string;

  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsNumber()
  discount: number;
}
