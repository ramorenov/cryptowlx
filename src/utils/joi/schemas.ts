import * as joi from "joi";

export const user = joi.object({
  name: joi.string().required().label("Ingrese un nombre de usuario válido"),
  last_name: joi.string().required().label("Ingrese un nombre de usuario válido"),
  username: joi.string().required().label("Ingrese un nombre de usuario válido"),
  password: joi.string().min(6).max(30).required().label("La contraseña debe tener minimo 6 caracteres y maximo 30"),
  pref_currency: joi.string().valid("usd", "euro", "arg").required().label("Ingrese el tipo de moneda preferido entre usd, euro, arg"),
});
