import * as repositories from "../../repositories/coins/coins";
import axios from "axios";
import { ICoin, IRespCoin, ITopCoin } from "../../interfaces/interfaces";
import { getUserById } from "../../repositories/users/users";

export const getCoins = async (params: { vs_currency: string; ids: string; per_page: number; page: number }) => {
  const { vs_currency, ids, per_page, page } = params;
  const url = "https://api.coingecko.com/api/v3/coins/markets";
  const requestOptions = {
    params: { vs_currency, ids, per_page, page },
  };

  try {
    const response = await axios.get(url, requestOptions);
    const coins = response.data;
    const result = coins.map((coin: IRespCoin) => ({
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
      throw `la moneda que intenta guardar no existe`;
    }
    const response = await repositories.saveCoin(coinData);

    return response;
  } catch (error) {
    return { failed: true, status: 500, message: error.toString() };
  }
};

export const topCoins = async (topCoinData: ITopCoin) => {
  const { user_id, top_n, order } = topCoinData;

  try {
    const user = await getUserById(user_id);
    const vs_currency = user?.pref_currency;
    const user_coins = await repositories.getUserCoins(user_id);
    if (user_coins.length === 0) {
      throw "el usuario no tiene monedas";
    }
    const ids = user_coins.map((item) => item.coin_id).toString();
    const urlMarkets = "https://api.coingecko.com/api/v3/coins/markets";
    const requestOptionsMarkets = {
      params: { ids, vs_currency },
    };
    const responseMarkets = await axios.get(urlMarkets, requestOptionsMarkets);
    const dataMarkets = responseMarkets.data;

    const urlPrices = "https://api.coingecko.com/api/v3/simple/price";
    const requestOptionsPrices = {
      params: { ids, vs_currencies: "usd,ars,eur" },
    };
    const responsePrices = await axios.get(urlPrices, requestOptionsPrices);
    const dataPrices = responsePrices.data;

    const result: {}[] = [];
    dataMarkets
      .sort((a: IRespCoin, b: IRespCoin) => (a.current_price < b.current_price ? 1 : -1))
      .slice(0, top_n)
      .map(function (item: IRespCoin, index: number) {
        const crypto = { symbol: item.symbol, name: item.name, image: item.image, ...dataPrices[item.id], last_updated: item.last_updated };
        result[index] = crypto;
      });
    order === "asc" ? result.reverse() : result;
    return result;
  } catch (error) {
    return { failed: true, status: 500, message: error.toString() };
  }
};
