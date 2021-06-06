import React from "react";
import { useSelector } from "react-redux";
import LogItem from "./LogItem";
import styles from "./LogItemList.module.css";

const LogItemList = () => {
  const logItems = useSelector((state) => state.stockPrice.logItems);

  return (
    <div className={styles.LogItemList}>
      {logItems.map((item) => (
        <LogItem key={item.time} item={item} />
      ))}
    </div>
  );
};

export default LogItemList;
