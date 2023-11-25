import { ICategory } from "./category.interface";
import { IReview } from "./review.interface";

export interface IProduct {
  uuid: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discount: number;
  reviews: IReview[];
  images: string[];
  createdAt: string;
  category: ICategory;
}

export type TypeProductData = {
  name: string;
  price: number;
  description?: string;
  images: string[];
  categoryId: number;
};

export type TypeProductDataFilters = {
  sort?: EnumProductSort | string;
  searchTerm?: string;
  page?: string | number;
  perPage: string | number;
  ratings: string;
  minPrice?: string;
  maxPrice?: string;
  categoryId?: string;
};

export type TypePaginationProducts = {
  length: number;
  products: IProduct[];
};

export enum EnumProductSort {
  HIGH_PRICE = "high-price",
  LOW_PRICE = "low-price",
  NEWEST = "newest",
  OLDEST = "oldest",
}
