import { Prisma } from '@prisma/client';

export const returnUserObject: Prisma.UserSelect = {
  uuid: true,
  email: true,
  role: true,
  town: true,
  first_name: true,
  avatarPath: true,
  password: false,
  phone_number: true,
};
