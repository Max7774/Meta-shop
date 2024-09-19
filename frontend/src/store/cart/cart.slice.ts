import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IAddToCartPayload,
  ICartInitialState,
  IChangeQuantityPayload,
} from "./cart.types";

const initialState: ICartInitialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IAddToCartPayload>) => {
      const isExistSize = state.items.some(
        (item) => item.product.uuid === action.payload.product.uuid
      );

      if (!isExistSize) {
        state.items.push({
          ...action.payload,
          length: state.items.length,
        });
      }
    },
    removeFromCart: (state, action: PayloadAction<{ uuid: string }>) => {
      state.items = state.items.filter(
        (item) => item.uuid !== action.payload.uuid
      );
    },
    changeQuantity: (state, action: PayloadAction<IChangeQuantityPayload>) => {
      const { uuid, type } = action.payload;
      const item = state.items.find((item) => item.uuid === uuid);
      const itemIndex = state.items.findIndex((item) => item.uuid === uuid);

      if (itemIndex !== -1) {
        if (item) {
          if (type === "plus") {
            item.quantity++;
          } else if (type === "minus") {
            item.quantity--;
            if (item.quantity <= 0) {
              state.items.splice(itemIndex, 1);
            }
          }
        }
      }
    },
    reset: (state) => {
      state.items = [];
    },
  },
});
