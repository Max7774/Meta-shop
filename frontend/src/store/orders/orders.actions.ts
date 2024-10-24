/* eslint-disable @typescript-eslint/no-explicit-any */
import { OrderService } from "@/service/order.service";
import { AsyncThunkConfig } from "@/types/TError";
import { TOrder, TOrderCartItem, TOrderForm, TOrderItem } from "@/types/TOrder";
import { EOrder } from "@enums/EOrder";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const getAllOrders = createAsyncThunk<
  TOrder[],
  { searchTerm: string; status?: EOrder }
>("/order/get-all", async (searchTerm, { rejectWithValue }) => {
  try {
    const response = await OrderService.getAllOrders(searchTerm);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const createOrder = createAsyncThunk<
  boolean,
  TOrderForm,
  AsyncThunkConfig<{ itemsInStock: TOrderCartItem[] }>
>("/order/create", async (data, { rejectWithValue }) => {
  try {
    const response = await OrderService.createOrder(data);

    return response.data;
  } catch (error: any) {
    console.log(error);
    const e = error as AxiosError<{ itemsInStock: TOrderCartItem[] }>;
    return rejectWithValue(e.response?.data);
  }
});

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
  { uuid: string; status: EOrder },
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

export const getOrderById = createAsyncThunk<TOrder, string>(
  "/order/get-by-id",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await OrderService.getOrderById(orderId);

      return response.data;
    } catch (error: any) {
      // window.location.href = "/";
      return rejectWithValue(error.message);
    }
  }
);

export const getReceiptFile = createAsyncThunk<any, string>(
  "/order/get-receipt-file",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await OrderService.getReceiptFile(orderId);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const actualizeOrder = createAsyncThunk<
  TOrder,
  { items: TOrderItem[]; orderId: string }
>("/order/actualize", async (data, { rejectWithValue }) => {
  try {
    const response = await OrderService.actualizeOrder(
      {
        items: data.items.map((item) => {
          return {
            ...item,
            price: Number(item.price),
            quantity: Number(item.quantity),
          };
        }),
      },
      data.orderId
    );

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const deleteOrder = createAsyncThunk<TOrder, string>(
  "/order/delete-by-id",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await OrderService.deleteOrder(orderId);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
