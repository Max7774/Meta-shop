import { ButtonHTMLAttributes } from "react";

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: "sm" | "md" | "lg";
  variant: "primary" | "secondary";
  isLoading?: boolean;
  disabled?: boolean;
}
