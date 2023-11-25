import { HTMLInputTypeAttribute, InputHTMLAttributes } from "react";

export interface ISearchField extends InputHTMLAttributes<HTMLInputElement> {
  type: HTMLInputTypeAttribute;
  placeholder: string;
  isLoading?: boolean
}
