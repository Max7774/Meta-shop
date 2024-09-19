import { createSlice } from "@reduxjs/toolkit";
import {
  cancelOrder,
  createOrder,
  getAllOrders,
  updateStatus,
} from "./orders.actions";
import { TOrder } from "@/types/TOrder";
import { toast } from "react-toastify";

type TOrdersState = {
  orders: TOrder[];
  isLoading: boolean;
  isCancelOrderLoading: boolean;
  isOrderStatusChangeLoading: boolean;
};

const initialState: TOrdersState = {
  orders: [],
  isLoading: false,
  isCancelOrderLoading: false,
  isOrderStatusChangeLoading: false,
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.orders = payload;
      })
      .addCase(getAllOrders.rejected, (state) => {
        state.isLoading = false;
        state.orders = [];
      })
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createOrder.rejected, (state) => {
        state.isLoading = false;
        state.orders = [];
      })
      .addCase(cancelOrder.pending, (state) => {
        state.isCancelOrderLoading = true;
      })
      .addCase(cancelOrder.fulfilled, (state) => {
        state.isCancelOrderLoading = false;
      })
      .addCase(cancelOrder.rejected, (state) => {
        state.isCancelOrderLoading = false;
        toast.error("Не удалось отменить заказ");
      })
      .addCase(updateStatus.pending, (state) => {
        state.isOrderStatusChangeLoading = true;
      })
      .addCase(updateStatus.fulfilled, (state) => {
        state.isOrderStatusChangeLoading = false;
      })
      .addCase(updateStatus.rejected, (state) => {
        state.isOrderStatusChangeLoading = false;
        toast.error("Не удалось обновить статус заказа");
      });
  },
});
