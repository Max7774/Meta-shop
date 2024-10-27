import { Prisma } from '@prisma/client';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class ProductDto implements Prisma.ProductUpdateInput {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  unitofmeasurement: string;

  @IsBoolean()
  inStock: boolean;

  @IsString()
  subcategoryUuid: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  discount: number;

  @IsOptional()
  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsString()
  companyUuid: string;
}
