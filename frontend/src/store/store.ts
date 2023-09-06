import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./user.slice/user.slice";
import { profileSlice } from "./profile.slice/profile.slice";

const combinedReducers = combineReducers({
  user: userSlice.reducer,
  profile: profileSlice.reducer,
});

let mainReducer = combinedReducers;

export const store = configureStore({
  reducer: mainReducer,
});

export type TypeRootState = ReturnType<typeof mainReducer>;
// export type AppDispatch = typeof store.dispatch

export default store;
