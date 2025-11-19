import axios from "axios";

const BASE_URL_ETH =
  "https://coins.llama.fi/prices/current/coingecko:ethereum,coingecko";

export const getCurrentEthPrice = async () => {
  try {
    const response = await axios.get(`${BASE_URL_ETH}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
