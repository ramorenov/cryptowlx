import { getRepository } from "typeorm";
import { Coin } from "../../entities/coin.entity";
import { ICoin } from "../../interfaces/interfaces";

export const saveCoin = async (coinData: ICoin) => {
  try {
    const coin = getRepository(Coin).create(coinData);
    const result = await getRepository(Coin).save(coin);

    return result;
  } catch (error) {
    throw new Error(`No se pudo crear el usuario debido al siguiente error: ${error.toString()}`);
  }
};
