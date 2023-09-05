import { IButton } from "@interfaces/components-interfaces/button.interface";
import { FC, PropsWithChildren } from "react";
import cn from "clsx";
import Loader from "@UI/Loader/Loader";

const Button: FC<PropsWithChildren<IButton>> = ({
  isLoading = false,
  variant,
  size,
  disabled,
  className,
  children,
  ...rest
}) => {
  return (
    <button
      disabled={disabled}
      className={cn(
        "text-white px-12 py-3 font-medium rounded-xl shadow-2xl hover:shadow-2xl transition duration-500 ease-in-out m-3",
        {
          "hover:shadow-2xl hover:-translate-x hover:scale-90 hover:bg-indigo-400":
            !disabled,
          "bg-primary": variant === "primary" && !disabled,
          "bg-secondary": variant === "secondary" && !disabled,
          "bg-disabled": disabled && variant === "secondary",
          "bg-disabledpri": disabled && variant === "primary",
          "py-1": isLoading,
          "text-sm": size === "sm",
          "px-12 py-3": size === "md",
          "px-12": size === "sm",
          "px-16 py-4": size === "lg",
        },
        className
      )}
      {...rest}
    >
      {isLoading ? <Loader /> : <>{children}</>}
    </button>
  );
};

export default Button;
