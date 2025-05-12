import React, { useState } from 'react';
import axios from 'axios';
import './StockAggregator.css';

const StockAggregator = () => {
  const [symbol, setSymbol] = useState('AAPL');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchStockData = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`http://localhost:9876/stocks/${symbol}`);
      setData(response.data);
    } catch (err) {
      setError('Could not fetch stock data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="stock-aggregator">
      <h1> Stock Price Aggregator</h1>
      <div className="controls">
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          placeholder="Enter Stock Symbol (e.g., AAPL)"
        />
        <button onClick={fetchStockData}>Fetch</button>
      </div>

      {loading && <p>Loading stock prices...</p>}
      {error && <p className="error">{error}</p>}

      {data && (
        <div className="result">
          <p><strong>Symbol:</strong> {symbol}</p>
          <p><strong>Previous Prices:</strong> {data.windowPrevState.join(', ')}</p>
          <p><strong>Current Prices:</strong> {data.windowCurrState.join(', ')}</p>
          <p><strong>Latest API Prices:</strong> {data.prices.join(', ')}</p>
          <p><strong>Average:</strong> {data.avg.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default StockAggregator;
