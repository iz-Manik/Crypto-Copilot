import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from './GlassCard';

const PortfolioTracker = ({ portfolio, portfolioValue, portfolioChange, onAddToPortfolio }) => {
  const [cryptoId, setCryptoId] = useState('bitcoin');
  const [amount, setAmount] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [error, setError] = useState('');

  const cryptoOptions = [
    { id: 'bitcoin', name: 'Bitcoin (BTC)' },
    { id: 'ethereum', name: 'Ethereum (ETH)' },
    { id: 'solana', name: 'Solana (SOL)' },
    { id: 'dogecoin', name: 'Dogecoin (DOGE)' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!amount || !purchasePrice) {
      setError('Please enter both amount and purchase price');
      return;
    }

    const amountNum = parseFloat(amount);
    const priceNum = parseFloat(purchasePrice);

    if (isNaN(amountNum)) {
      setError('Please enter a valid amount');
      return;
    }

    if (isNaN(priceNum)) {
      setError('Please enter a valid purchase price');
      return;
    }

    const selectedCrypto = cryptoOptions.find(option => option.id === cryptoId);
    if (!selectedCrypto) {
      setError('Invalid cryptocurrency selected');
      return;
    }

    onAddToPortfolio({
      id: cryptoId,
      name: selectedCrypto.name,
      amount: amountNum,
      purchasePrice: priceNum
    });

    // Reset form
    setAmount('');
    setPurchasePrice('');
  };

  return (
    <GlassCard className="portfolio-card" delay={0.3}>
      <motion.h2 
        className="card-title"
        whileHover={{ scale: 1.05 }}
      >
        <motion.i 
          className="fas fa-wallet"
          animate={{ rotateY: [0, 180, 0] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 4 }}
        />
        Portfolio Tracker
      </motion.h2>
      <motion.div 
        className="portfolio-value-3d"
        animate={{ 
          scale: [1, 1.02, 1],
          textShadow: [
            '0 0 10px rgba(0, 211, 149, 0.5)',
            '0 0 20px rgba(0, 211, 149, 0.8)',
            '0 0 10px rgba(0, 211, 149, 0.5)'
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        ${portfolioValue.toLocaleString('en-US', { maximumFractionDigits: 2 })}
      </motion.div>
      <motion.div 
        className={`portfolio-change-3d ${portfolioChange >= 0 ? 'positive' : 'negative'}`}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
      >
        {portfolioChange >= 0 ? '+' : ''}{portfolioChange.toFixed(2)}%
      </motion.div>

      <motion.form 
        className="portfolio-form-3d" 
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <div className="form-group">
          <label htmlFor="crypto-select">Select Cryptocurrency:</label>
          <select
            id="crypto-select"
            className="form-input-3d"
            value={cryptoId}
            onChange={(e) => setCryptoId(e.target.value)}
          >
            {cryptoOptions.map(option => (
              <option key={option.id} value={option.id}>{option.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="crypto-amount">Amount:</label>
          <input
            type="number"
            className="form-input-3d"
            id="crypto-amount"
            placeholder="0.00"
            step="0.0001"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="purchase-price">Purchase Price ($):</label>
          <input
            type="number"
            className="form-input-3d"
            id="purchase-price"
            placeholder="0.00"
            step="0.01"
            min="0"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(e.target.value)}
          />
        </div>

        {error && <div className="error-message">{error}</div>}
        }

        <motion.button 
          type="submit"
          className="submit-btn-3d"
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0 10px 30px rgba(233, 69, 96, 0.4)'
          }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.i 
            className="fas fa-plus"
            animate={{ rotate: [0, 90, 0] }}
            transition={{ duration: 0.3 }}
          />
          Add to Portfolio
        </motion.button>
      </motion.form>
    </GlassCard>
  );
};

export default PortfolioTracker;