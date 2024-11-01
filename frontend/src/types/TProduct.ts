import { TCategory, TSubCategory } from "./TCategory";
import { TCompanyProduct } from "./TCompany";

export type TProduct = {
  images: string[];
  description: string;
  unitofmeasurement: string;
  uuid: string;
  name: string;
  createdAt: string;
  peculiarities: string;
  slug: string;
  category: Pick<TCategory, "name" | "slug" | "uuid">;
  reviews: [];
  subcategory: TSubCategory;
  isNew: boolean;
  inStock: boolean;
  isDeleted?: boolean;
  company: TCompanyProduct[];
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
