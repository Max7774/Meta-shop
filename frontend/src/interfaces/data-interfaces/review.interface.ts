import { IUser } from "./user.interface";

export interface IReview {
  uuid: string;
  user: IUser;
  createdAt: string;
  text: string;
  rating: number;
}
