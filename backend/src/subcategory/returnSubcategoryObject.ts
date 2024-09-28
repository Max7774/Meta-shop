import { Prisma } from '@prisma/client';

export const returnSubcategoryObject: Prisma.SubcategorySelect = {
  uuid: true,
  name: true,
  slug: true,
  icon: true,
  category: {
    select: {
      uuid: true,
      name: true,
      slug: true,
    },
  },
};
