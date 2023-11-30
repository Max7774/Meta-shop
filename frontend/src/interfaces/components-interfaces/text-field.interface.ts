import { InputHTMLAttributes } from "react";
import { IconType } from "react-icons";

export interface ITextField extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  error?: string;
  label?: string;
  color?: "black" | "white";
  helperText?: string;
  uniqueLink?: boolean;
  center?: boolean;
  name?: string;
  token?: boolean;
  Icon?: IconType;
}
