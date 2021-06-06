import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { togglePrintingLog } from "../../redux/stockPrice/stockPriceSlice";
import styles from "./LogButton.module.css";

const LogButton = () => {
  const isPrintingLog = useSelector((state) => state.stockPrice.isPrintingLog);
  const dispatch = useDispatch();

  return (
    <button
      className={styles.LogButton}
      onClick={() => dispatch(togglePrintingLog())}
    >
      {isPrintingLog ? "Pause Log" : "Resume Log"}
    </button>
  );
};

export default LogButton;
