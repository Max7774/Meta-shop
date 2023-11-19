import { ITextField } from "@interfaces/components-interfaces/text-field.interface";
import { forwardRef, useState } from "react";
import cn from "clsx";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import AuthError from "../AuthError/AuthError";

const TextField = forwardRef<HTMLInputElement, ITextField>(
  (
    {
      placeholder,
      error,
      token,
      pattern,
      className,
      type,
      style,
      helperText,
      color,
      label,
      center,
      name,
      uniqueLink,
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
      setShowPassword((prevState) => !prevState);
    };
    return (
      <div className="m-3">
        <label className={cn("mb-4", className)} style={style}>
          <span
            className={cn("mb-1 ml-2 block text-center", {
              "text-black": color === "black",
              "text-white": color === "white",
              "text-start": !center,
              "text-center": center,
            })}
          >
            {!!label ? label : placeholder}
          </span>
          <div className="relative hover:-translate-y-1 hover:scale-100 hover:bg-indigo-500 duration-500">
            <input
              name={name}
              placeholder={placeholder}
              ref={ref}
              type={showPassword ? "text" : type}
              className={cn(
                "border-b-2 px-4 py-2 text-white w-full outline-none bg-secondary focus:border-b-primary transition-all placeholder:text-white rounded-xl",
                { "border-b-red": !!error }
              )}
              {...rest}
            />
            {!token && (
              <>
                {type === "password" ? (
                  <button
                    type="button"
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-white"
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? (
                      <IoMdEyeOff size={25} />
                    ) : (
                      <IoMdEye size={25} />
                    )}
                  </button>
                ) : null}
              </>
            )}
          </div>
        </label>
        {helperText && (
          <div className="ml-2 text-xs text-white mt-1">{helperText}</div>
        )}
        <AuthError error={error === undefined ? "" : error} />
      </div>
    );
  }
);

export default TextField;
