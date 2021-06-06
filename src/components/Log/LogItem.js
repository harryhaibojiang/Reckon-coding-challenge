import React from "react";

const LogItem = ({ item }) => (
  <div>
    <div>Updates for {item.time}</div>
    {item.data.map((stock) => (
      <div key={stock.code}>
        {stock.code}: ${stock.price}
      </div>
    ))}
    <br />
  </div>
);

export default LogItem;
