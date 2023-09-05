import { ITextField } from "@interfaces/components-interfaces/text-field.interface";
import { forwardRef, useState } from "react";
import cn from "clsx";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

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
          <div className="relative">
            <input
              name={name}
              placeholder={placeholder}
              ref={ref}
              type={showPassword ? "text" : type}
              className={cn(
                "px-4 py-2 w-full outline-none border border-gray border-solid focus:border-primary transition-all placeholder:text-gray rounded-xl focus:-translate-y-1 focus:scale-100 focus:bg-indigo-500 duration-500",
                { "border-red": !!error }
              )}
              {...rest}
            />
            {!token && (
              <>
                {type === "password" ? (
                  <button
                    type="button"
                    className="absolute top-1/2 bg-white right-3 transform -translate-y-1/2"
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                  </button>
                ) : null}
              </>
            )}
          </div>
        </label>
        {helperText && (
          <div className="ml-4 text-xs" style={{ color: "#8c8c8c" }}>
            {helperText}
          </div>
        )}
        {error && <div className="text-red mt-1 text-sm">{error}</div>}
      </div>
    );
  }
);

export default TextField;
