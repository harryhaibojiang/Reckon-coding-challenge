import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import stockPriceReducer from "./stockPrice/stockPriceSlice";

export const store = configureStore({
  reducer: {
    stockPrice: stockPriceReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
