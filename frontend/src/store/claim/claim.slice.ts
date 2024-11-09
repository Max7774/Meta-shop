import { createSlice } from "@reduxjs/toolkit";
import { TClaimState } from "./claim.type";
import { createClaim, getAllClaims } from "./claim.actions";

const initialState: TClaimState = {
  claims: [],
  isLoading: false,
};

export const claimSlice = createSlice({
  name: "claim",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllClaims.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllClaims.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.claims = payload;
      })
      .addCase(getAllClaims.rejected, (state) => {
        state.isLoading = false;
        state.claims = [];
      })
      .addCase(createClaim.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createClaim.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createClaim.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
