import { user } from "./schemas";

const responseValidation = (value: any) => {
  if (value["error"]) {
    return {
      failed: true,
      status: 400,
      message: value.error.details[0].context.label,
      nameEndpoint: "/joiValidate",
    };
  }
  return value.value;
};

export const validateUser = (data: Object) => {
  const value = user.validate(data);
  const response = responseValidation(value);
  return response;
};
