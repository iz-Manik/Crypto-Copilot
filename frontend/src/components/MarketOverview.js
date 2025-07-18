import React from 'react';
import { motion } from 'framer-motion';
import { FaBitcoin, FaEthereum } from 'react-icons/fa';
import { FaCoins } from 'react-icons/fa';
import { FaRedditAlien } from 'react-icons/fa';
import GlassCard from './GlassCard';

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
      <GlassCard className="market-card">
        <motion.h2 className="card-title">
          <i className="fas fa-chart-line"></i> Market Overview
        </motion.h2>
        <div className="loading-placeholder-3d">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="loading-bar-3d"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="market-card" delay={0.1}>
      <motion.h2 
        className="card-title"
        whileHover={{ scale: 1.05 }}
      >
        <motion.i 
          className="fas fa-chart-line"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
        />
        Market Overview
      </motion.h2>
      <motion.ul className="crypto-list-3d">
        {cryptoData.map(crypto => {
          const changeClass = crypto.price_change_percentage_24h >= 0 ? 'positive' : 'negative';
          const changeIcon = crypto.price_change_percentage_24h >= 0 ? '▲' : '▼';

          return (
            <motion.li 
              className="crypto-item-3d" 
              key={crypto.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: crypto.id === 'bitcoin' ? 0 : 0.1 * (cryptoData.indexOf(crypto) + 1) }}
              whileHover={{ 
                scale: 1.02,
                x: 10,
                transition: { duration: 0.2 }
              }}
            >
              <div className="crypto-name-3d">
                <motion.div 
                  className="crypto-icon"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {getIcon(crypto.id)}
                </motion.div>
                <span className="crypto-text">{crypto.name} ({crypto.symbol.toUpperCase()})</span>
              </div>
              <div className="crypto-info-3d">
                <motion.div 
                  className="crypto-price"
                  whileHover={{ scale: 1.1 }}
                >
                  ${crypto.current_price.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                </motion.div>
                <motion.div 
                  className={`crypto-change-3d ${changeClass}`}
                  animate={{ 
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  {changeIcon} {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                </motion.div>
                </div>
              </div>
            </motion.li>
          );
        })}
      </motion.ul>
    </GlassCard>
  );
};

export default MarketOverview;