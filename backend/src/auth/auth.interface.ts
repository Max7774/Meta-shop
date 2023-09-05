import { User } from '@prisma/client';

export type TypeRole = User['role'];

export type ResetPasswordType = {
  old_pass: string;
  new_pass: string;
  resetToken: string;
};
