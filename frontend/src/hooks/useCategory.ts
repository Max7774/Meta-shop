import { useAppSelector } from "./redux-hooks/reduxHooks";

export const useCategory = () => useAppSelector((state) => state.category);
