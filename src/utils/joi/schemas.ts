import * as joi from "joi";

export const user = joi.object({
  name: joi.string().required().label("Ingrese un nombre válido"),
  last_name: joi.string().required().label("Ingrese un apellido válido"),
  username: joi.string().required().label("Ingrese un nombre de usuario válido"),
  password: joi
    .string()
    .alphanum()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .required()
    .label("La contraseña debe ser alfanumerica y tener minimo, 8 caracteres"),
  pref_currency: joi.string().valid("usd", "euro", "ars").required().label("Ingrese el tipo de moneda preferido entre usd, euro, arg"),
});
