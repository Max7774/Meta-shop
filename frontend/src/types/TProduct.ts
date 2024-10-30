import { TCategory, TSubCategory } from "./TCategory";

export type TProduct = {
  images: string[];
  description: string;
  unitofmeasurement: string;
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
  subcategory: TSubCategory;
  isNew: boolean;
  inStock: boolean;
  isDeleted?: boolean;
  company: {
    uuid: string;
    name: string;
  };
};

export type TProductsResponse = {
  products: TProduct[];
  length: number;
};

export type TProductCreateForm = {
  name: string;
  price: number;
  description: string;
  subcategoryUuid: string;
  discount: number;
  inStock: boolean;
  unitofmeasurement: string;
  companyUuid: string;
  images?: File[];
};
