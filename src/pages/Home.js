import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { fetchStockPrice } from "../redux/stockPrice/stockPriceSlice";
import Log from "../components/Log/Log";
import Summary from "../components/Summary/Summary";
import styles from "./Home.module.css";

const Home = () => {
  const dispatch = useDispatch();
  const intervalRef = useRef();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      dispatch(fetchStockPrice());
    }, 2000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [dispatch]);

  return (
    <div className={styles.Home}>
      <Log />
      <Summary />
    </div>
  );
};

export default Home;
