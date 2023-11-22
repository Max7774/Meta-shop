import * as userActions from "./user.slice/user.actions";
import * as profileActions from "./profile.slice/profile.actions";
import { carouselSlice } from "./carousel.slice/carousel.slice";
import * as categoryActions from "./category.slice/category.actions";

export const rootActions = {
  ...carouselSlice.actions,
  ...categoryActions,
  ...userActions,
  ...profileActions,
};
