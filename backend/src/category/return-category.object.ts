import { Prisma } from '@prisma/client';

export const returnCategoryObject: Prisma.CategorySelect = {
  uuid: true,
  name: true,
  slug: true,
};

export const returnAllCategoryObject: Prisma.CategorySelect = {
  uuid: true,
  name: true,
  slug: true,
  icon: true,
  subcategory: {
    select: {
      uuid: true,
      name: true,
      slug: true,
    },
  },
};
