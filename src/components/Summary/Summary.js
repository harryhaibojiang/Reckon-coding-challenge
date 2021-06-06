import React from "react";
import { useSelector } from "react-redux";
import styles from "./Summary.module.css";

const Summary = () => {
  const summary = useSelector((state) => state.stockPrice.summary);

  return (
    <div className={styles.Summary}>
      <h2>Summary</h2>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Stock</th>
              <th>Starting</th>
              <th>Lowest</th>
              <th>Highest</th>
              <th>Current</th>
            </tr>
          </thead>
          <tbody>
            {summary.map((item) => (
              <tr key={item.code}>
                <td>{item.code}</td>
                <td>{item.starting}</td>
                <td>{item.lowest}</td>
                <td>{item.highest}</td>
                <td>{item.current}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Summary;
