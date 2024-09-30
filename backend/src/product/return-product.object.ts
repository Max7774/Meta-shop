import { Prisma } from '@prisma/client';
import { returnReviewObject } from 'src/review/return-review.object';
import { returnSubcategoryObject } from 'src/subcategory/returnSubcategoryObject';

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
  unitofmeasurement: true,
  inStock: true,
  subcategory: { select: returnSubcategoryObject },
  reviews: {
    select: returnReviewObject,
    orderBy: {
      createdAt: 'desc',
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
  inStock: true,
  createdAt: new Date(),
  slug: 'string',
  subcategory: {
    name: 'string',
    slug: 'string',
  },
  reviews: [
    {
      uuid: 'string',
    },
  ],
};
