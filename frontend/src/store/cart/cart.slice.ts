import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ICartInitialState,
  ICartItem,
  IChangeQuantityPayload,
  IUpdateItemsInStockPayload,
} from "./cart.types";
import { getStoreLocal, setLocalStorage } from "@utils/local-storage";
import { TCompanyProduct } from "@/types/TCompany";

const initialState: ICartInitialState = {
  items: getStoreLocal("cart") || [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ICartItem>) => {
      const isExistSize = state.items.some(
        (item) => item.product.uuid === action.payload.product.uuid
      );

      if (!isExistSize) {
        state.items.push({
          ...action.payload,
          length: state.items.length,
        });
        setLocalStorage("cart", state.items);
      }
    },
    removeFromCart: (state, action: PayloadAction<{ uuid: string }>) => {
      state.items = state.items.filter(
        (item) => item.uuid !== action.payload.uuid
      );
      setLocalStorage("cart", state.items);
    },
    updateSelectedCompanyProduct: (
      state,
      action: PayloadAction<{ uuid: string }>
    ) => {
      state.items = state.items.map((item) => {
        const selected = item.product.company.find(
          (el) => el.uuid === action.payload.uuid
        ) as TCompanyProduct;

        return {
          ...item,
          price: selected.discount
            ? selected.price - (selected.price * selected.discount) / 100
            : selected.price,
          discount: selected.discount,
          selectedCompanyProduct: selected,
        };
      });
      setLocalStorage("cart", state.items);
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
              setLocalStorage("cart", state.items);
            }
          }
        }
      }
      setLocalStorage("cart", state.items);
    },
    reset: (state) => {
      state.items = [];
      setLocalStorage("cart", state.items);
    },
    updateItemsInStock: (
      state,
      action: PayloadAction<IUpdateItemsInStockPayload>
    ) => {
      const { itemsInStock } = action.payload;
      state.items = state.items.map((item) => {
        const stockItem = itemsInStock.find(
          (stockItem) => stockItem.productUuid === item.productUuid
        );
        if (stockItem) {
          return {
            ...item,
            inStock: stockItem.inStock,
          };
        }
        return item;
      });
      setLocalStorage("cart", state.items);
    },
  },
});
