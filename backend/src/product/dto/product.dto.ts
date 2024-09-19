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

  @IsOptional()
  @IsString()
  subcategoryUuid: string;

  @IsOptional()
  @IsString()
  peculiarities: string;

  @IsOptional()
  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsNumber()
  discount: number;
}
