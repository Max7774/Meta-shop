import { ISubcategory } from "./subcategory.interface";

export interface ICategory {
  name: string;
  slug: string;
  icon: string;
  subcategory?: ISubcategory[];
}

export interface IResponseCategory {
  categories: ICategory[];
}
