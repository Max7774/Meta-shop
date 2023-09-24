import { EnumRoleOfUser } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class AuthDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  first_name: string;

  @IsOptional()
  @IsString()
  second_name: string;

  @MinLength(6, {
    message: 'Password must be at least 6 characters long',
  })
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  phone_number: string;

  @IsOptional()
  @IsString()
  town: string;

  @IsOptional()
  @IsEnum(EnumRoleOfUser)
  role: EnumRoleOfUser;

  @IsOptional()
  @IsString()
  birth_day: string;
}
