import React from 'react';
import { FaBitcoin, FaEthereum } from 'react-icons/fa';
import { FaCoins } from 'react-icons/fa';
import { FaRedditAlien } from 'react-icons/fa';

const MarketOverview = ({ cryptoData, loading }) => {
  const getIcon = (id) => {
    switch (id) {
      case 'bitcoin': return <FaBitcoin />;
      case 'ethereum': return <FaEthereum />;
      case 'solana': return <FaCoins />;  // Use FaCoins instead
      case 'dogecoin': return <FaRedditAlien />;
      default: return <FaBitcoin />;
    }
  };

  if (loading) {
    return (
      <div className="card">
        <h2><i className="fas fa-chart-line"></i> Market Overview</h2>
        <div className="loading-placeholder">
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h2><i className="fas fa-chart-line"></i> Market Overview</h2>
      <ul className="crypto-list">
        {cryptoData.map(crypto => {
          const changeClass = crypto.price_change_percentage_24h >= 0 ? 'positive' : 'negative';
          const changeIcon = crypto.price_change_percentage_24h >= 0 ? '▲' : '▼';

          return (
            <li className="crypto-item" key={crypto.id}>
              <div className="crypto-name">
                {getIcon(crypto.id)}
                <span>{crypto.name} ({crypto.symbol.toUpperCase()})</span>
              </div>
              <div className="crypto-info">
                <div>${crypto.current_price.toLocaleString('en-US', { maximumFractionDigits: 2 })}</div>
                <div className={`crypto-change ${changeClass}`}>
                  {changeIcon} {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MarketOverview;