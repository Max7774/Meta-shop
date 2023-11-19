import { getStoreLocal } from "@utils/local-storage";
import { checkAuth, login, logout, verifyAccount } from "./user.actions";
import { createSlice } from "@reduxjs/toolkit";
import { IInitialState } from "types/user.type";

const initialState: IInitialState = {
  user: getStoreLocal("user"),
  verified: false,
  isLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(verifyAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyAccount.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.verified = payload.user.verified;
        state.user = { user: payload.user };
      })
      .addCase(verifyAccount.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload.user;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
