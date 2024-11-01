export type TCompany = {
  name: string;
  uuid: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  officialName: string;
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
