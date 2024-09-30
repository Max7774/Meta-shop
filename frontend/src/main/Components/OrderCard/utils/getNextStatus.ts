import { EOrder } from "@enums/EOrder";

export const getNextStatus = (currentStatus: EOrder) => {
  switch (currentStatus) {
    case EOrder.Pending:
      return EOrder.Payed;
    case EOrder.Payed:
      return EOrder.In_Delivery;
    case EOrder.In_Delivery:
      return EOrder.Delivered;
    case EOrder.Delivered:
      return null;
    default:
      return null;
  }
};
