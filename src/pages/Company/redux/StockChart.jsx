import React from 'react';
import CandlestickChart from './CandleStickChart';

export default function StockChart({stock, storedStock}) {
  console.log(stock);
  return (
    <div className="companyStockChart">
      <CandlestickChart chartData={storedStock} realTimeData={stock}/>
    </div>
  );
};
