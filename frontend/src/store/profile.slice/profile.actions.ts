import { IProfileUser } from "@interfaces/data-interfaces/user.interface";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserService } from "@services/main/user.service";

/* get profile */
export const getProfile = createAsyncThunk<IProfileUser>(
  "user/get-profile",
  async (_, thunkApi) => {
    try {
      const response = await UserService.getProfile();

      return {
        profile: {
          favorites: response.favorites,
          orders: response.orders,
          user: response,
        },
      };
    } catch (error: any) {
      return thunkApi.rejectWithValue(
        error.response.data.message || "Unknown error"
      );
    }
  }
);
