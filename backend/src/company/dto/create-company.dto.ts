import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  name: string;

  @IsString()
  officialName: string;

  @IsString()
  address: string;

  @IsString()
  email: string;

  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  englishName: string;

  @IsNumber()
  deliveryPrice: number;

  @IsNumber()
  minimumOrderPrice: number;
}
