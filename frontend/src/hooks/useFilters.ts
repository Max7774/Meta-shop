import { useAppSelector } from "./redux-hooks/reduxHooks";

export const useFilters = () => useAppSelector((state) => state.filters);
