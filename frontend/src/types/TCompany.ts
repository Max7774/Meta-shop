import { TAdminUser } from "./TUser";

export type TCompany = {
  name: string;
  uuid: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  officialName: string;
  logoPath: string;
  deliveryPrice: number;
  minimumOrderPrice: number;
  registrationNumber: string;
  address: string;
  phoneNumber: string;
  users: [
    {
      uuid: string;
      email: string;
    }
  ];
};

export type TCompanyProduct = {
  uuid: string;
  createdAt: string;
  updatedAt: string;
  price: number;
  quantity: number;
  discount: number;
  productUuid: string;
  companyUuid: string;
  company: TCompany;
};

export type TCompanyInfo = {
  users: TAdminUser[];
  companyProducts: TCompanyProduct[];
} & TCompany;

export type TEditCompany = {
  name: string;
  email: string;
  officialName: string;
  address: string;
  phoneNumber: string;
  deliveryPrice: number;
  minimumOrderPrice: number;
};
