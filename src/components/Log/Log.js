import React from "react";
import LogButton from "./LogButton";
import LogItemList from "./LogItemList";
import styles from "./Log.module.css";

const Log = () => {
  return (
    <div className={styles.Log}>
      <div className={styles.heading}>
        <h2>Log</h2>
        <LogButton />
      </div>
      <LogItemList />
    </div>
  );
};

export default Log;
