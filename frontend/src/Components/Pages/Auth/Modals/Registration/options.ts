import { validEmail } from "@utils/validations/valid-email";
import { AuthOptionsType } from "types/auth.types";

export const registrationOptions: AuthOptionsType[] = [
  {
    step: 1,
    options: [
      {
        fieldType: "text",
        type: "first_name",
        placeholder: "Имя",
        required: {
          isRequired: true,
          messageReq: "Это обязательное поле!",
        },
      },
      {
        fieldType: "text",
        type: "second_name",
        placeholder: "Фамилия",
        required: {
          isRequired: true,
          messageReq: "Это обязательное поле!",
        },
      },
      {
        fieldType: "text",
        type: "phone_number",
        placeholder: "Номер телефона",
        required: {
          isRequired: true,
          messageReq: "Это обязательное поле!",
        },
      },
      {
        fieldType: "text",
        type: "town",
        placeholder: "Город",
        required: {
          isRequired: true,
          messageReq: "Это обязательное поле!",
        },
      },
      {
        fieldType: "date",
        type: "birth_day",
        placeholder: "Дата рождения",
        required: {
          isRequired: true,
          messageReq: "Это обязательное поле!",
        },
      },
    ],
  },
  {
    step: 2,
    options: [
      {
        fieldType: "text",
        type: "email",
        placeholder: "Email",
        required: {
          isRequired: true,
          messageReq: "Это обязательное поле!",
        },
        rule: {
          message: "Пожалуйста, введите корректный email",
          value: validEmail,
        },
      },
      {
        fieldType: "password",
        type: "password",
        placeholder: "Пароль",
        required: {
          isRequired: true,
          messageReq: "Это обязательное поле!",
        },
        minLength: {
          value: 6,
          message: "Минимальное количество символов 6",
        },
      },
      {
        fieldType: "repeat_password",
        type: "repeat_password",
        placeholder: "Повторите пароль",
        required: {
          isRequired: true,
          messageReq: "Это обязательное поле!",
        },
        minLength: {
          value: 6,
          message: "Минимальное количество символов 6",
        },
      },
    ],
  },
];
