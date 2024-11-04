import { ERoles } from "@enums/ERoles";

export type TLogin = {
  email: string;
  password: string;
};

export type TAuthnResponse = {
  user: {
    verified: boolean;
    uuid: string;
    email: string;
    role: ERoles;
    companyUuid?: string;
  };
  accessToken: string;
  refreshToken: string;
};

export type TRegister = {
  email: string;
  password: string;
  first_name: string;
  second_name: string;
  phone_number: string;
  town: string;
  code?: string;
};

export type TResetPassword = {
  email?: string;
  new_pass: string;
  resetToken: string;
};

export type TSignUp = {
  email: string;
  phone_number: string;
  first_name: string;
  second_name?: string;
};
