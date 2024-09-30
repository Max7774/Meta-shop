import { IsOptional, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  town: string;

  @IsString()
  street: string;

  @IsString()
  house: string;

  @IsOptional()
  @IsString()
  apartment: string;

  @IsOptional()
  @IsString()
  intercom: string;

  @IsOptional()
  @IsString()
  entrance: string;

  @IsOptional()
  @IsString()
  floor: string;
}
