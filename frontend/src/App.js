import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MarketOverview from './components/MarketOverview';
import CryptoChart from './components/CryptoChart';
import PortfolioTracker from './components/PortfolioTracker';
import AssistantChat from './components/AssistantChat';
import { getCachedCryptoData } from './services/cryptoData';
import './styles/main.css';

function App() {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [portfolio, setPortfolio] = useState([]);
  const [portfolioValue, setPortfolioValue] = useState(18426.50);
  const [portfolioChange, setPortfolioChange] = useState(7.2);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getCachedCryptoData();  // Updated function name
        setCryptoData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading crypto data:', error);
        setLoading(false);
      }
    };

    loadData();

    // Load portfolio from localStorage if available
    const savedPortfolio = localStorage.getItem('cryptoPortfolio');
    if (savedPortfolio) {
      setPortfolio(JSON.parse(savedPortfolio));
    }
  }, []);

  useEffect(() => {
    // Save portfolio to localStorage
    localStorage.setItem('cryptoPortfolio', JSON.stringify(portfolio));

    // Calculate portfolio value
    if (portfolio.length > 0) {
      let totalValue = 0;
      let totalCost = 0;

      portfolio.forEach(item => {
        const crypto = cryptoData.find(c => c.id === item.id);
        if (crypto) {
          totalValue += crypto.current_price * item.amount;
          totalCost += item.purchasePrice * item.amount;
        }
      });

      if (totalCost > 0) {
        const changePercentage = ((totalValue - totalCost) / totalCost) * 100;
        setPortfolioValue(totalValue);
        setPortfolioChange(changePercentage);
      }
    }
  }, [portfolio, cryptoData]);

  const addToPortfolio = (newItem) => {
    setPortfolio([...portfolio, newItem]);
  };

  return (
    <div className="app-container">
      <Header />

      <div className="dashboard">
        <MarketOverview cryptoData={cryptoData} loading={loading} />
        <CryptoChart cryptoData={cryptoData} loading={loading} />
        <PortfolioTracker
          portfolio={portfolio}
          portfolioValue={portfolioValue}
          portfolioChange={portfolioChange}
          onAddToPortfolio={addToPortfolio}
        />
      </div>

      <AssistantChat />

      <footer>
        <p>Crypto Copilot &copy; {new Date().getFullYear()} | Powered by io.net AI | Real-time market data</p>
        <p><i className="fas fa-shield-alt"></i> All data is securely processed | Not financial advice</p>
      </footer>
    </div>
  );
}

export default App;