import { User } from '@prisma/client';

export type TypeRole = User['role'];

export type ResetPasswordType = {
  new_pass: string;
  resetToken: string;
};
