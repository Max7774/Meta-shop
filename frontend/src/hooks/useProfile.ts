import { useEffect } from "react";
import { useAuth } from "./auth-hooks/useAuth";
import { useActions } from "./useActions";
import { getAccessToken } from "@utils/tokens";

export const useProfile = () => {
  const { profile, isProfileLoading } = useAuth();
  const { getUserProfile } = useActions();
  const accessToken = getAccessToken();

  useEffect(() => {
    if (accessToken) getUserProfile();
  }, [accessToken]);

  return {
    profile,
    isProfileLoading,
  };
};
