import * as userActions from "./user.slice/user.actions";
import * as profileActions from "./profile.slice/profile.actions";

export const rootActions = {
  ...userActions,
  ...profileActions,
};
