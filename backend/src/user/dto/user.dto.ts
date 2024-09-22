import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UserDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  first_name: string;

  @IsOptional()
  @IsString()
  second_name: string;

  @IsOptional()
  @IsString()
  avatarPath: string;

  @IsOptional()
  @IsString()
  phone_number?: string;
}
