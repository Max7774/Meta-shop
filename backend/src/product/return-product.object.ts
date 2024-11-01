import { Prisma } from '@prisma/client';
import { returnSubcategoryObject } from 'src/subcategory/returnSubcategoryObject';

export const productReturnObject: Prisma.ProductSelect = {
  images: true,
  description: true,
  uuid: true,
  name: true,
  createdAt: true,
  peculiarities: true,
  slug: true,
  unitofmeasurement: true,
  inStock: true,
  company: {
    select: {
      uuid: true,
      company: {
        select: {
          name: true,
        },
      },
      createdAt: true,
      updatedAt: true,
      price: true,
      quantity: true,
      discount: true,
      productUuid: true,
      companyUuid: true,
    },
  },
  subcategory: { select: returnSubcategoryObject },
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
