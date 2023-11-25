export interface IModal {
  login: boolean;
  register: boolean;
  resetPassword: boolean;
}

export interface IPayloadActionModal {
  type: IModalActions;
  payload: boolean;
}

export type IModalActions = "login" | "register" | "resetPassword";
