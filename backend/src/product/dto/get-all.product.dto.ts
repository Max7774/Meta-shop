import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/pagination/dto/pagination.dto';

export enum EnumProductsSort {
  HIGH_PRICE = 'high-price',
  LOW_PRICE = 'low-price',
  NEWEST = 'newest',
  OLDEST = 'oldest',
}

export class GetAllProductDto extends PaginationDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(EnumProductsSort)
  sort?: EnumProductsSort;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  searchTerm?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  ratings?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  minPrice?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  maxPrice?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  categoryUuid?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  subcategoryUuid?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  companyUuid?: string;
}
