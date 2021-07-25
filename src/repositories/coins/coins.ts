import { getRepository } from "typeorm";
import { Coin } from "../../entities/coin.entity";
import { ICoin } from "../../interfaces/interfaces";

export const saveCoin = async (coinData: ICoin) => {
  try {
    const coin = getRepository(Coin).create(coinData);
    const result = await getRepository(Coin).save(coin);

    return result;
  } catch (error) {
    throw new Error(`No se pudo guardar la moneda debido al siguiente error: ${error.toString()}`);
  }
};

export const getUserCoins = async (user_id: string) => {
  try {
    const result = getRepository(Coin).find({ user_id });

    return result;
  } catch (error) {
    throw new Error(`No se encontraron monedas debido al siguiente error: ${error.toString()}`);
  }
};
