import stockPriceReducer, {
  togglePrintingLog,
  fetchStockPrice,
} from "./stockPriceSlice";

const initialState = {
  logItems: [],
  isPrintingLog: true,
  summary: [],
};
const stockPrice1 = [
  { code: "AFAIK", price: 247.4 },
  { code: "AKA", price: 114.2 },
];
const stockPrice2 = [
  { code: "AFAIK", price: 241.4 },
  { code: "CAD", price: 244.8 },
];
const emptyData = [];

describe("stockPrice reducer basic", () => {
  it("should handle initial state", () => {
    expect(stockPriceReducer(undefined, { type: "unknown" })).toEqual({
      logItems: [],
      isPrintingLog: true,
      summary: [],
    });
  });

  it("should handle togglePrintingLog", () => {
    const actual = stockPriceReducer(initialState, togglePrintingLog());
    expect(actual.isPrintingLog).toEqual(false);
  });

  it("should handle fetchStockPrice", () => {
    const actual = stockPriceReducer(
      initialState,
      fetchStockPrice.fulfilled(stockPrice1)
    );
    expect(actual.logItems[0].data).toEqual(stockPrice1);
  });

  it("should calculate summary", () => {
    const actual = stockPriceReducer(
      initialState,
      fetchStockPrice.fulfilled(stockPrice1)
    );
    expect(actual.summary).toEqual(
      stockPrice1.map((item) => ({
        code: item.code,
        current: item.price,
        highest: item.price,
        lowest: item.price,
        starting: item.price,
      }))
    );
  });
});

describe("stockPrice reducer with printing log state set to true", () => {
  it("should handle empty returning data", () => {
    const actual1 = stockPriceReducer(
      initialState,
      fetchStockPrice.fulfilled(stockPrice1)
    );
    const actual2 = stockPriceReducer(
      actual1,
      fetchStockPrice.fulfilled(emptyData)
    );

    // new record is inserted into the begining of the array
    expect(actual2.logItems[1].data).toEqual(stockPrice1);
    expect(actual2.logItems[0].data).toEqual([]);
    expect(actual2.summary).toEqual(actual1.summary);
  });

  it("should handle new stock code", () => {
    const actual1 = stockPriceReducer(
      initialState,
      fetchStockPrice.fulfilled(stockPrice1)
    );
    const actual2 = stockPriceReducer(
      actual1,
      fetchStockPrice.fulfilled(stockPrice2)
    );

    // new record is inserted into the begining of the array
    expect(actual2.logItems[1].data).toEqual(stockPrice1);
    expect(actual2.logItems[0].data).toEqual(stockPrice2);
    expect(actual2.summary).toEqual([
      {
        code: stockPrice1[0].code,
        current: stockPrice2[0].price,
        highest: stockPrice1[0].price,
        lowest: stockPrice2[0].price,
        starting: stockPrice1[0].price,
      },
      {
        code: stockPrice1[1].code,
        current: stockPrice1[1].price,
        highest: stockPrice1[1].price,
        lowest: stockPrice1[1].price,
        starting: stockPrice1[1].price,
      },
      {
        code: stockPrice2[1].code,
        current: stockPrice2[1].price,
        highest: stockPrice2[1].price,
        lowest: stockPrice2[1].price,
        starting: stockPrice2[1].price,
      },
    ]);
  });
});

describe("stockPrice reducer with printing log state set to false", () => {
  it("should update summary", () => {
    const actual = stockPriceReducer(
      {
        ...initialState,
        isPrintingLog: false,
      },
      fetchStockPrice.fulfilled(stockPrice1)
    );

    // the logItems should stop updating
    expect(actual.logItems).toEqual([]);

    // while the summary should update
    expect(actual.summary[0].code).toEqual("AFAIK");
    expect(actual.summary[0].current).toEqual(247.4);
    expect(actual.summary[0].lowest).toEqual(247.4);
    expect(actual.summary[0].highest).toEqual(247.4);
    expect(actual.summary[0].starting).toEqual(247.4);
  });
});
