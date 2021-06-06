import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { stockPriceAPI } from "./stockPriceAPI";
import dayjs from "dayjs";

const fetchStockPrice = createAsyncThunk(
  "stockPrice/fetchStockPrice",
  async () => {
    const response = await stockPriceAPI.fetchStockPrice();
    return response.data;
  }
);

export const stockPriceSlice = createSlice({
  name: "stockPrice",
  initialState: {
    logItems: [],
    isPrintingLog: true,
    summary: [],
  },
  reducers: {
    togglePrintingLog: (state) => {
      state.isPrintingLog = !state.isPrintingLog; // redux-toolkit have Immer build in, so it is safe to mutate the state.
    },
  },
  extraReducers: {
    [fetchStockPrice.fulfilled]: (state, action) => {
      if (state.isPrintingLog) {
        state.logItems.unshift({
          time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
          data: action.payload,
        });
      }

      action.payload.forEach((stock) => {
        const currentPrice = stock.price;
        const index = state.summary.findIndex(
          (item) => item.code === stock.code
        );
        if (index === -1) {
          state.summary.push({
            code: stock.code,
            starting: currentPrice,
            lowest: currentPrice,
            highest: currentPrice,
            current: currentPrice,
          });
        } else {
          state.summary[index].current = currentPrice;
          if (currentPrice < state.summary[index].lowest) {
            state.summary[index].lowest = currentPrice;
          } else if (currentPrice > state.summary[index].highest) {
            state.summary[index].highest = currentPrice;
          }
        }
      });
    },
  },
});

export const { togglePrintingLog } = stockPriceSlice.actions;

export { fetchStockPrice };

export default stockPriceSlice.reducer;
