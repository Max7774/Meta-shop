import { Prisma } from '@prisma/client';

export const returnCategoryObject: Prisma.CategorySelect = {
  uuid: true,
  name: true,
  slug: true,
};

export const returnAllCategoryObject: Prisma.CategorySelect = {
  name: true,
  slug: true,
  subcategory: {
    select: {
      name: true,
      slug: true,
    },
  },
};
