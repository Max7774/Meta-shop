export type TAddCompany = {
  name: string;
  officialName: string;
  address: string;
  email: string;
  phoneNumber: string;
  englishName: string;
  deliveryPrice: number;
  minimumOrderPrice: number;
  logoPath?: File;
};
