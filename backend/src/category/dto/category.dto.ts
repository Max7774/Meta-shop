import { IsString } from 'class-validator';

export class CategoryDto {
  @IsString()
  category_name: string;

  @IsString()
  subcategory_name: string;
}
