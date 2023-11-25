import { useEffect } from "react";
import { useActions } from "./useActions";
import { useAppSelector } from "./redux-hooks/reduxHooks";
import Cookies from "js-cookie";
import { REFRESH_TOKEN } from "@utils/tokens";
import { useNavigate } from "react-router-dom";

export const useProfile = () => {
  const { getProfile } = useActions();
  const profile = useAppSelector((store) => store.profile);
  const navigate = useNavigate();

  useEffect(() => {
    const refreshToken = Cookies.get(REFRESH_TOKEN);
    if (refreshToken) {
      getProfile();
    }
  }, [getProfile, navigate]);

  return { profile };
};
