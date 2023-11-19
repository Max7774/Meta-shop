import { useEffect } from "react";
import { useActions } from "./useActions";
import { useAppSelector } from "./redux-hooks/reduxHooks";

export const useProfile = () => {
  const { getProfile } = useActions();
  const profile = useAppSelector((store) => store.profile);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return { profile };
};
