import axios from "axios";
import { any } from "joi";

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
