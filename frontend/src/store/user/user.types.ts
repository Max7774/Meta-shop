import { TProfile } from "@/types/TProfile";
import { ERoles } from "@enums/ERoles";

export interface IUserInitialState {
  profile: TProfile;
  isLoading: boolean;
  isAuth: boolean;
  isProfileLoading: boolean;
  resetPasswordCode?: "none" | "waiting code" | "fulfilled";
  registerCode?: "none" | "waiting code" | "fulfilled";
  role?: ERoles;
  isError: boolean;
}
