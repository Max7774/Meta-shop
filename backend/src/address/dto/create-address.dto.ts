import { IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  town: string;

  @IsString()
  street: string;

  @IsString()
  house: string;

  @IsString()
  apartment: string;

  @IsString()
  intercom: string;

  @IsString()
  entrance: string;

  @IsString()
  floor: string;
}
