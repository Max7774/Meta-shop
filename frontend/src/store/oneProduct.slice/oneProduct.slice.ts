import { IProduct } from "@interfaces/data-interfaces/product.interface";
import { createSlice } from "@reduxjs/toolkit";
import { getOneProduct } from "./oneProduct.actions";

const initialState: IProduct = {
  uuid: "",
  name: "",
  description: "",
  category: {
    name: "",
    slug: "",
    icon: "",
  },
  price: 0,
  images: [],
  quantity: 0,
  reviews: [],
  isNew: false,
  slug: "",
  discount: 0,
  createdAt: "",
  peculiarities: "",
};

export const oneProductSlice = createSlice({
  name: "oneProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOneProduct.pending, (state, { payload }) => {
      state = {
        ...state,
      };
    });
    builder.addCase(getOneProduct.fulfilled, (state, { payload }) => {
      state.uuid = payload.uuid;
      state.name = payload.name;
      state.description = payload.description;
      state.category = payload.category;
      state.price = payload.price;
      state.images = payload.images;
      state.quantity = payload.quantity;
      state.reviews = payload.reviews;
      state.isNew = payload.isNew;
      state.slug = payload.slug;
      state.discount = payload.discount;
      state.createdAt = payload.createdAt;
      state.peculiarities = payload.peculiarities;
    });
    builder.addCase(getOneProduct.rejected, (state, { payload }) => {
      state = {
        ...state,
      };
    });
  },
});
