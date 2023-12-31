import { Prisma } from '@prisma/client';
import { returnCategoryObject } from 'src/category/return-category.object';
import { returnReviewObject } from 'src/review/return-review.object';

export const productReturnObject: Prisma.ProductSelect = {
  images: true,
  description: true,
  uuid: true,
  name: true,
  price: true,
  discount: true,
  createdAt: true,
  peculiarities: true,
  slug: true,
  quantity: true,
  category: { select: returnCategoryObject },
  reviews: {
    select: returnReviewObject,
    orderBy: {
      createdAt: 'desc',
    },
  },
  subcategory: {
    select: {
      name: true,
      slug: true,
    },
  },
};

export const productReturnObjectFull: Prisma.ProductSelect = {
  ...productReturnObject,
};

export const returnProductSchema = {
  images: ['string'],
  description: 'string',
  uuid: 'string',
  name: 'string',
  price: 0,
  discount: 0,
  createdAt: new Date(),
  slug: 'string',
  category: {
    name: 'string',
    slug: 'string',
  },
  reviews: [
    {
      uuid: 'string',
    },
  ],
  subcategory: {
    name: 'string',
    slug: 'string',
  },
};
