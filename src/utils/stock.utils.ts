import axios from 'axios';

export const getStocksData = async () => {
  try {
    const response = await axios.get(
      'https://stock-api-production.up.railway.app/stock_market'
    );

    return response.data;
  } catch (err) {
    console.error(err);
    return err;
  }
};
