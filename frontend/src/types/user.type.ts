export type LoginUserField = {
  email: string;
  password: string;
};

export type IInitialState = {
  user: UserType | null;
  isLoading: boolean;
};

export type RegisterType = {
  email: string;
  first_name: string;
  second_name: string;
  password: string;
  phone_number: string;
  town: string;
  birth_day: string;
};

export type UserType = {
  user: {
    verified: boolean;
    uuid: string;
    email: string;
    role: UserRoles;
  };
};

export enum UserRoles {
  ADMIN,
  DEFAULT_USER,
  MANAGER,
}
