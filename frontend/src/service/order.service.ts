/* eslint-disable @typescript-eslint/no-explicit-any */
import { ORDERS } from "@/const/startApi";
import { TOrder, TOrderForm } from "@/types/TOrder";
import { instance } from "@api/api.interceptor";
import { EOrder } from "@enums/EOrder";

export const OrderService = {
  async getAllOrders(params?: { searchTerm: string; status?: EOrder }) {
    return await instance<TOrder[]>({
      url: ORDERS,
      method: "GET",
      params,
    });
  },

  async createOrder(data: TOrderForm) {
    return await instance<boolean>({
      url: `${ORDERS}/order-create`,
      method: "POST",
      data,
    });
  },

  async cancelOrder(orderUuid: string) {
    return await instance<boolean>({
      url: `${ORDERS}/cancel/${orderUuid}`,
      method: "GET",
    });
  },

  async updateStatus(status: EOrder, orderUuid: string) {
    return await instance<{ uuid: string; status: EOrder }>({
      url: `${ORDERS}/status`,
      method: "POST",
      data: { status, orderUuid },
    });
  },

  async getOrderById(orderId: string) {
    return await instance<TOrder>({
      url: `${ORDERS}/${orderId}`,
      method: "GET",
    });
  },

  async getReceiptFile(orderId: string) {
    const result = await instance<any>({
      url: `${ORDERS}/receipt/${orderId}`,
      method: "GET",
      responseType: "blob",
    });

    return result;
  },
};
