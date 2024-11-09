import { EnumTypeOfClaim } from "@enums/EClaim";

export type TClaim = {
  uuid: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  text: string;
  phone: string;
  claimType: EnumTypeOfClaim;
};

export type TCreateClaim = {
  email: string;
  text: string;
  type: EnumTypeOfClaim;
  phone?: string;
};
