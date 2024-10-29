import { TProfile } from "@/types/TProfile";
import { TAdminUser } from "@/types/TUser";
import { ERoles } from "@enums/ERoles";

export interface IUserInitialState {
  profile: TProfile;
  isLoading: boolean;
  isAuth: boolean;
  isProfileLoading: boolean;
  userList: TAdminUser[];
  isAdminUserLoading: boolean;
  resetPasswordCode?: "none" | "waiting code" | "fulfilled";
  registerCode?: "none" | "waiting code" | "fulfilled";
  role?: ERoles;
  isError: boolean;
  isDeleteLoading: boolean;
}
