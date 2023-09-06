import { ICategory } from "./category.interface";
import { IReview } from "./review.interface";

export interface IProduct {
  uuid: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  reviews: IReview[];
  images: string[];
  createdAt: string;
  category: ICategory;
}
