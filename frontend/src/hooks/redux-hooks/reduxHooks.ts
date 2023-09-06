import type { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import store, { TypeRootState } from "@store/store";
import type { TypedUseSelectorHook } from "react-redux";
import { useSelector } from "react-redux";

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  TypeRootState,
  unknown,
  AnyAction
>;
// Use throughout your app instead of plain `useDispatch` and `useSelector`
// export const useAppDispatch: () => AppDispatch & Dispatch<AppThunk> =
// 	useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
