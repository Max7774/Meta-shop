import { FieldErrors, UseFormRegister } from "react-hook-form";
import { AuthOptionsType } from "types/auth.types";
import { RegisterType } from "types/user.type";

export interface AuthFieldsGroupProps {
  errors: FieldErrors<RegisterType>;
  isError?: boolean;
  register: UseFormRegister<RegisterType>;
  step?: number;
  options: AuthOptionsType[];
}
