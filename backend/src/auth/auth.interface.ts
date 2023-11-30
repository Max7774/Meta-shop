import { User } from '@prisma/client';

export type TypeRole = User['role'];

export class ResetPasswordType {
  new_pass: string;
  resetToken: string;
}
