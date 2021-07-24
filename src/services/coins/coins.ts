import * as repositories from "../../repositories/coins/coins";

import axios from "axios";
import { ICoin } from "../../interfaces/interfaces";

export const getCoins = async (params: { vs_currency: string; ids: string; per_page: number; page: number }) => {
  const { vs_currency, ids, per_page, page } = params;
  const url = "https://api.coingecko.com/api/v3/coins/markets";
  const requestOptions = {
    params: { vs_currency, ids, per_page, page },
  };

  try {
    const response = await axios.get(url, requestOptions);
    const coins = response.data;
    const result = coins.map((coin: any) => ({
      id: coin.id,
      symbol: coin.symbol,
      current_price: coin.current_price,
      name: coin.name,
      image: coin.image,
      last_updated: coin.last_updated,
    }));

    return result;
  } catch (error) {
    return { failed: true, status: 500, message: error.toString() };
  }
};

export const saveCoin = async (coinData: ICoin) => {
  const { coin_id } = coinData;
  const url = `https://api.coingecko.com/api/v3/coins/markets`;
  const requestOptions = { params: { vs_currency: "usd", ids: coin_id } };

  try {
    const coinVerify = await axios.get(url, requestOptions);
    if (coinVerify.data.length != 1) {
      throw new Error(`la moneda que intenta guardar no existe`);
    }
    const response = await repositories.saveCoin(coinData);

    return response;
  } catch (error) {
    console.log(error);
    return { failed: true, status: 500, message: error.toString() };
  }
};
