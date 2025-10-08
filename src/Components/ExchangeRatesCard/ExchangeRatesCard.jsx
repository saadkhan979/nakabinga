import React, { useState } from 'react';
import './exchnageRatesCard.css';
const ExchangeRatesCard = ({ rates }) => {
  const [isInverse, setIsInverse] = useState(false);

  return (
    <div>
      <h6 className="mb-2">Live Exchange Rates Against Base Currency</h6>
      <div className="d-card account-balance-card">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center account-name w-100">
            <label htmlFor="inverse" className="toggleLabel me-2">
              Inverse
            </label>
            <div className="d-inline-flex align-items-center">
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  name="inverse"
                  id="inverse"
                  checked={isInverse}
                  onChange={(e) => setIsInverse(e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>
        <table className="exchangeRatesTable w-100">
          <thead>
            <tr>
              <th>FCy</th>
              <th width="100px">Rates</th>
              <th>Change (24h)</th>
            </tr>
          </thead>
          <tbody>
            {rates.map((rate, index) => (
              <tr key={index}>
                <td style={{ padding: '8px 0' }}>{rate.currency}</td>
                <td style={{ padding: '8px 0' }}>
                  {isInverse
                    ? (1 / parseFloat(rate.rate)).toFixed(4)
                    : rate.rate}
                </td>
                <td
                  style={{
                    padding: '8px 0',
                    color: rate.isPositive ? '#22C55E' : '#EF4444',
                  }}
                >
                  {rate.change}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExchangeRatesCard;
