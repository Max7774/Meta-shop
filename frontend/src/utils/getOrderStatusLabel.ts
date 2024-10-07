import { EOrder } from "@enums/EOrder";

export function getOrderStatusLabel(value: EOrder): {
  status: string;
  color: "warning" | "primary" | "secondary" | "success" | "default";
} {
  switch (value) {
    case EOrder.Pending:
      return {
        status: "Оформлен",
        color: "warning",
      };
    case EOrder.Delivered:
      return {
        status: "Доставлен",
        color: "secondary",
      };
    case EOrder.Payed:
      return {
        status: "Оплачен",
        color: "primary",
      };
    case EOrder.In_Delivery:
      return {
        status: "Доставка",
        color: "success",
      };
    case EOrder.Canceled:
      return {
        status: "Отменен",
        color: "default",
      };
    default:
      return value;
  }
}
