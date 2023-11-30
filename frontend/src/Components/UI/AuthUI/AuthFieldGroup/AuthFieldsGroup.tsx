import { FC } from "react";
import TextField from "../TextField/TextField";
import { AuthFieldsGroupProps } from "./auth-field.interface";
import { OptionsFieldType } from "types/auth.types";

const AuthFieldsGroup: FC<AuthFieldsGroupProps> = ({
  register,
  step,
  errors,
  options,
}) => {
  return (
    <>
      {options
        .filter(({ step: s }) => step === s)
        .map(({ options }) =>
          options.map(
            (
              {
                type,
                required: { isRequired, messageReq },
                placeholder,
                rule,
                minLength,
                fieldType,
              }: OptionsFieldType,
              i
            ) => (
              <TextField
                key={`${i}-${type}`}
                {...register(type, {
                  required: isRequired ? messageReq : false,
                  pattern: rule,
                  minLength,
                })}
                color="white"
                type={fieldType}
                placeholder={placeholder}
                error={errors[type]?.message}
              />
            )
          )
        )}
    </>
  );
};

export default AuthFieldsGroup;
