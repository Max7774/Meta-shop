import { createSlice } from "@reduxjs/toolkit";
import {
  cancelOrder,
  createOrder,
  getAllOrders,
  getOrderById,
  updateStatus,
} from "./orders.actions";
import { TOrder } from "@/types/TOrder";
import { toast } from "react-toastify";
import { EOrder } from "@enums/EOrder";

type TOrdersState = {
  orders: TOrder[];
  oneOrder: TOrder;
  isLoading: boolean;
  isCancelOrderLoading: boolean;
  isOrderStatusChangeLoading: boolean;
};

const initialState: TOrdersState = {
  orders: [],
  oneOrder: {} as TOrder,
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
      .addCase(cancelOrder.fulfilled, (state, { meta: { arg } }) => {
        state.isCancelOrderLoading = false;
        const orderIndex = state.orders.findIndex(
          (order) => order.uuid === arg
        );
        if (orderIndex !== -1) {
          state.orders[orderIndex].status = EOrder.Canceled;
        }
      })
      .addCase(cancelOrder.rejected, (state) => {
        state.isCancelOrderLoading = false;
        toast.error("Не удалось отменить заказ");
      })
      .addCase(updateStatus.pending, (state) => {
        state.isOrderStatusChangeLoading = true;
      })
      .addCase(updateStatus.fulfilled, (state, { payload }) => {
        state.isOrderStatusChangeLoading = false;
        const orderIndex = state.orders.findIndex(
          (order) => order.uuid === payload.uuid
        );
        if (orderIndex !== -1) {
          state.orders[orderIndex].status = payload.status;
        }
      })
      .addCase(updateStatus.rejected, (state) => {
        state.isOrderStatusChangeLoading = false;
        toast.error("Не удалось обновить статус заказа");
      })
      .addCase(getOrderById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderById.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.oneOrder = payload;
      })
      .addCase(getOrderById.rejected, (state) => {
        state.isLoading = false;
        state.oneOrder = {} as TOrder;
      });
  },
});
