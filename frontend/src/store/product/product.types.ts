import { TCompanyProduct } from "@/types/TCompany";
import { TProduct } from "@/types/TProduct";

export type TProductState = {
  isLoading: boolean;
  isProductLoading: boolean;
  products: TProduct[];
  length: number;
  product?: TProduct;
  selectedCompanyProduct: TCompanyProduct;
};
