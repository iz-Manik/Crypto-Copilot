import React, { useState } from 'react';

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
    <div className="card">
      <h2><i className="fas fa-wallet"></i> Portfolio Tracker</h2>
      <div className="portfolio-value">${portfolioValue.toLocaleString('en-US', { maximumFractionDigits: 2 })}</div>
      <div className={`portfolio-change ${portfolioChange >= 0 ? 'positive' : 'negative'}`}>
        {portfolioChange >= 0 ? '+' : ''}{portfolioChange.toFixed(2)}%
      </div>

      <form className="portfolio-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="crypto-select">Select Cryptocurrency:</label>
          <select
            id="crypto-select"
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
            id="purchase-price"
            placeholder="0.00"
            step="0.01"
            min="0"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(e.target.value)}
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit">
          <i className="fas fa-plus"></i> Add to Portfolio
        </button>
      </form>
    </div>
  );
};

export default PortfolioTracker;