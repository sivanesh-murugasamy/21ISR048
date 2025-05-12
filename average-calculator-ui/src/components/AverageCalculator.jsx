import React, { useState } from 'react';
import './AverageCalculator.css';

const options = ['p', 'f', 'e', 'r']; // prime, fibonacci, even, random

const AverageCalculator = () => {
  const [type, setType] = useState('e');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`http://localhost:9876/numbers/${type}`);
      if (!response.ok) throw new Error('Server Error');
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError('Failed to fetch data. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="calculator">
      <h1>Average Calculator</h1>
      <div className="controls">
        <label>Select Number Type:</label>
        <select value={type} onChange={e => setType(e.target.value)}>
          <option value="p">Prime</option>
          <option value="f">Fibonacci</option>
          <option value="e">Even</option>
          <option value="r">Random</option>
        </select>
        <button onClick={fetchData}>Fetch & Calculate</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {data && (
        <div className="results">
          <h2>Results</h2>
          <p><strong>Previous Window:</strong> [{data.windowPrevState.join(', ')}]</p>
          <p><strong>Current Window:</strong> [{data.windowCurrState.join(', ')}]</p>
          <p><strong>Numbers from API:</strong> [{data.numbers.join(', ')}]</p>
          <p><strong>Average:</strong> {data.avg.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default AverageCalculator;
