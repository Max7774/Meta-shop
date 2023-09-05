import { Prisma } from '@prisma/client';
import { returnUserObject } from 'src/user/return-user-object';

export const returnReviewObject: Prisma.ReviewSelect = {
  user: {
    select: returnUserObject,
  },
  createdAt: true,
  text: true,
  rating: true,
  uuid: true,
  productUuid: true,
};
