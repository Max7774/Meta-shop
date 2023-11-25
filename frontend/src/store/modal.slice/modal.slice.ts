import {
  IModal,
  IModalActions,
} from "@interfaces/data-interfaces/modal.interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: IModal = {
  login: false,
  register: false,
  resetPassword: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<IModalActions>) => {
      state[action.payload] = true;
    },
    closeModal: (state, action: PayloadAction<IModalActions>) => {
      state[action.payload] = false;
    },
  },
});
