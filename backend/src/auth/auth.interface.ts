import { User } from '@prisma/client';
import { IsString } from 'class-validator';

export type TypeRole = User['role'];

export class ResetPasswordType {
  @IsString()
  new_pass: string;

  @IsString()
  resetToken: string;
}

export class UpdateEmail {
  @IsString()
  new_email: string;
}

export class PhoneRegister {
  @IsString()
  phone_number: string;

  @IsString()
  first_name: string;

  @IsString()
  second_name?: string;

  @IsString()
  email: string;
}
