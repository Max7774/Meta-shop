import { TCategory, TSubCategory } from "./TCategory";

export type TProduct = {
  images: string[];
  description: string;
  uuid: string;
  name: string;
  price: number;
  discount: number;
  createdAt: string;
  peculiarities: string;
  slug: string;
  quantity: number;
  category: Pick<TCategory, "name" | "slug" | "uuid">;
  reviews: [];
  subcategory: Pick<TSubCategory, "name" | "slug">;
  isNew: boolean;
};

export type TProductsResponse = {
  products: TProduct[];
  length: number;
};

export type TProductCreateForm = {
  name: string;
  price: number;
  description: string;
  categoryUuid: string;
  peculiarities: string;
  quantity: number;
  discount: number;
  subcategoryUuid?: string;
  images?: File[];
};
