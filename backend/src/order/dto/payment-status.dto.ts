import { EnumOrderItemStatus } from '@prisma/client';

export class PaymentStatusDto {
  status: EnumOrderItemStatus;
  orderUuid: string;
}
