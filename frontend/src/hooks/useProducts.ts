import { useAppSelector } from "./redux-hooks/reduxHooks";

export const useProducts = () => useAppSelector((state) => state.products);
