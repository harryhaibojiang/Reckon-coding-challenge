import axios from "axios";

const stockPriceAPI = {
  fetchStockPrice: async () => {
    const stockPrice = axios.get("/api/stock-pricing");
    return stockPrice;
  },
};

export { stockPriceAPI };
