import { createSlice } from "@reduxjs/toolkit";
import { IUserInitialState } from "./user.types";
import {
  createAddress,
  getAllUsers,
  getNewAccessToken,
  getUserProfile,
  login,
  phoneRegister,
  register,
  resetPassword,
  sendEmailToResetPassword,
  setCurrentAddress,
  setNewUserAvatar,
  updateProfile,
  verifyAccessToken,
  verifyTokenFromRegister,
} from "./user.actions";
import { TProfile } from "@/types/TProfile";
import { ERoles } from "@enums/ERoles";

const info: TProfile = {
  uuid: "",
  email: "",
  role: ERoles.DEFAULT_USER,
  first_name: "",
  second_name: "",
  avatarPath: "",
  phone_number: "",
  currentAddress: "",
  favorites: [],
  orders: [],
  addresses: [],
};

const initialState: IUserInitialState = {
  profile: { ...info },
  userList: [],
  isLoading: false,
  registerCode: "none",
  resetPasswordCode: "none",
  isAuth: false,
  isError: false,
  isProfileLoading: false,
  isAdminUserLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        /* ===================== LOGIN ===================== */
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(login.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuth = true;
        state.isError = false;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isAuth = false;
        state.isError = true;
      })
      .addCase(register.pending, (state) => {
        /* ===================== REGISTER ===================== */
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.registerCode = "waiting code";
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.registerCode = "none";
      })
      .addCase(verifyTokenFromRegister.pending, (state) => {
        /* ===================== VERIFY REGISTER TOKEN ===================== */
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(verifyTokenFromRegister.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isAuth = true;
        state.registerCode = "fulfilled";
      })
      .addCase(verifyTokenFromRegister.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isAuth = false;
        state.registerCode = "none";
      })
      .addCase(sendEmailToResetPassword.pending, (state) => {
        /* ===================== SEND TOKEN TO RESET PASSWORD ===================== */
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(sendEmailToResetPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.resetPasswordCode = "waiting code";
      })
      .addCase(sendEmailToResetPassword.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.registerCode = "none";
      })
      .addCase(resetPassword.pending, (state) => {
        /* ===================== RESET PASSWORD ===================== */
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isAuth = true;
        state.resetPasswordCode = "fulfilled";
      })
      .addCase(resetPassword.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isAuth = false;
        state.registerCode = "none";
      })
      .addCase(verifyAccessToken.pending, (state) => {
        /* ===================== VERIFY ACCESS TOKEN ===================== */
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(verifyAccessToken.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.isAuth = true;
        state.profile.role = payload;
      })
      .addCase(verifyAccessToken.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isAuth = false;
      })
      .addCase(getNewAccessToken.pending, (state) => {
        /* ===================== GET NEW ACCESS TOKEN ===================== */
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getNewAccessToken.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isAuth = true;
      })
      .addCase(getNewAccessToken.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isAuth = false;
      })
      .addCase(getUserProfile.pending, (state) => {
        /* ===================== GET USER PROFILE ===================== */
        state.isProfileLoading = true;
        state.isError = false;
      })
      .addCase(getUserProfile.fulfilled, (state, { payload }) => {
        state.isProfileLoading = false;
        state.isError = false;
        state.profile = payload;
      })
      .addCase(getUserProfile.rejected, (state) => {
        state.isProfileLoading = false;
        state.isError = true;
      })
      .addCase(phoneRegister.pending, (state) => {
        /* ===================== PHONE REGISTER ===================== */
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(phoneRegister.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuth = true;
        state.isError = false;
      })
      .addCase(phoneRegister.rejected, (state) => {
        state.isLoading = false;
        state.isAuth = false;
        state.isError = true;
      })
      .addCase(setCurrentAddress.pending, (state) => {
        /* ===================== SET CURRENT ADDRESS ===================== */
        state.isProfileLoading = true;
      })
      .addCase(setCurrentAddress.fulfilled, (state, { payload }) => {
        state.isProfileLoading = false;
        state.profile.currentAddress = payload;
      })
      .addCase(setCurrentAddress.rejected, (state) => {
        state.isProfileLoading = false;
      })
      .addCase(createAddress.pending, (state) => {
        /* ===================== CREATE ADDRESS ===================== */
        state.isProfileLoading = true;
      })
      .addCase(createAddress.fulfilled, (state, { payload }) => {
        state.isProfileLoading = false;
        state.profile.currentAddress = payload.uuid;
        state.profile.addresses = [payload, ...state.profile.addresses];
      })
      .addCase(createAddress.rejected, (state) => {
        state.isProfileLoading = false;
      })
      .addCase(updateProfile.pending, (state) => {
        /* ===================== UPDATE PROFILE ===================== */
        state.isProfileLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, { payload }) => {
        state.isProfileLoading = false;
        state.profile = payload;
      })
      .addCase(updateProfile.rejected, (state) => {
        state.isProfileLoading = false;
      })
      .addCase(setNewUserAvatar.pending, (state) => {
        /* ===================== SET NEW AVATAR PROFILE ===================== */
        state.isProfileLoading = true;
      })
      .addCase(setNewUserAvatar.fulfilled, (state, { payload }) => {
        state.isProfileLoading = false;
        state.profile.avatarPath = payload;
      })
      .addCase(setNewUserAvatar.rejected, (state) => {
        state.isProfileLoading = false;
      })
      .addCase(getAllUsers.pending, (state) => {
        /* ===================== GET ALL USERS ===================== */
        state.isAdminUserLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, { payload }) => {
        state.isAdminUserLoading = false;
        state.userList = payload;
      })
      .addCase(getAllUsers.rejected, (state) => {
        state.isAdminUserLoading = false;
      });
  },
});
