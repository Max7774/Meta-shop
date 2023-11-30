import { ValidationRule } from "react-hook-form";
import { IconType } from "react-icons";
import { RegisterType } from "./user.type";
import { HTMLInputTypeAttribute } from "react";

type ExtendedHTMLInputTypeAttribute = HTMLInputTypeAttribute | "repeatPassword";

export type OptionsFieldType = {
  fieldType: ExtendedHTMLInputTypeAttribute;
  type: keyof RegisterType;
  placeholder: string;
  rule?: ValidationRule<RegExp> | undefined;
  minLength?: {
    value: number;
    message: string;
  };
  required: {
    isRequired: boolean;
    messageReq: string;
  };
  Icon?: IconType;
};

export type AuthOptionsType = {
  step: number;
  options: OptionsFieldType[];
};
