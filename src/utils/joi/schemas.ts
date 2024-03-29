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
  pref_currency: joi.string().valid("usd", "eur", "ars").required().label("Ingrese el tipo de moneda preferido entre usd, euro, ars"),
});

export const coinList = joi.object({
  vs_currency: joi.string().valid("usd", "eur", "ars").required().label("Ingrese el tipo de moneda preferido entre usd, euro, ars"),
  ids: joi.string().label("Ingrese el symbolo de la criptomoneda"),
  order: joi.string().valid("market_cap_desc", "market_cap_asc").label("Ingrese un nombre de usuario válido"),
  per_page: joi.number().label("Ingrese un valor numerico para paginación"),
  page: joi.number().label("Ingrese un numero de pagina valido"),
});

export const coin = joi.object({
  user_id: joi.string().required(),
  coin_id: joi.string().required().label("Ingrese el id de la criptomoneda que desea guardar"),
});

export const coinTop = joi.object({
  user_id: joi.string().required(),
  order: joi.string().valid("desc", "asc").default("desc").label("Ingrese tipo de ordenamiento asc o desc"),
  top_n: joi.number().min(1).max(25).required().label("Ingrese un numero entero entre 1 y 25"),
});
