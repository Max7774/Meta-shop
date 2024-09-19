import { IsOptional, IsString } from 'class-validator';

export class CategoryDto {
  @IsString()
  category_name: string;

  @IsOptional()
  @IsString()
  subcategory_name: string;
}
