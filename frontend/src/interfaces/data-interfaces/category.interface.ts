import { ISubcategory } from "./subcategory.interface";

export interface ICategory extends ISubcategory {
  uuid: string;
  name: string;
  slug: string;
}
