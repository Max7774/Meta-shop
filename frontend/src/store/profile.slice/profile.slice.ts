import { IProfileUser } from "@interfaces/data-interfaces/user.interface";
import { createSlice } from "@reduxjs/toolkit";
import { getProfile } from "./profile.actions";

const initialState: IProfileUser = {
  profile: {
    favorites: [],
    orders: [],
    user: {
      uuid: "",
      email: "",
      first_name: "",
      avatarPath: "",
      phone: "",
    },
  },
  isLoading: false,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.profile = payload.profile;
      })
      .addCase(getProfile.rejected, (state) => {
        state = {
          profile: {
            favorites: [],
            orders: [],
            user: {
              uuid: "",
              email: "",
              first_name: "",
              avatarPath: "",
              phone: "",
            },
          },
          isLoading: false,
        };
      });
  },
});
