export type TAddress = {
  uuid: string;
  town: string;
  street: string;
  house: string;
  apartment: string;
  intercom: string;
  entrance: string;
  floor: string;
};

export type TAddressForm = Omit<TAddress, "uuid">;
