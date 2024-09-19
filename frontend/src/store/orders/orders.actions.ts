import { OrderService } from "@/service/order.service";
import { TOrder, TOrderForm } from "@/types/TOrder";
import { EOrder } from "@enums/EOrder";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllOrders = createAsyncThunk<TOrder[], { searchTerm: string }>(
  "/order/get-all",
  async (searchTerm, { rejectWithValue }) => {
    try {
      const response = await OrderService.getAllOrders(searchTerm);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createOrder = createAsyncThunk<boolean, TOrderForm>(
  "/order/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await OrderService.createOrder(data);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const cancelOrder = createAsyncThunk<boolean, string>(
  "/order/cancel",
  async (orderUuid, { rejectWithValue }) => {
    try {
      const response = await OrderService.cancelOrder(orderUuid);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateStatus = createAsyncThunk<
  boolean,
  { orderUuid: string; status: EOrder }
>("/order/update-status", async (data, { rejectWithValue }) => {
  try {
    const response = await OrderService.updateStatus(
      data.status,
      data.orderUuid
    );

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});
