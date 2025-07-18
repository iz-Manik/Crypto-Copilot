import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import MarketOverview from './components/MarketOverview';
import CryptoChart from './components/CryptoChart';
import PortfolioTracker from './components/PortfolioTracker';
import AssistantChat from './components/AssistantChat';
import Scene3D from './components/Scene3D';
import ParticleBackground from './components/ParticleBackground';
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
    <div className="app-container-3d">
      <ParticleBackground />
      
      <Header />

      <motion.div 
        className="scene-container"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        <Scene3D cryptoData={cryptoData} />
      </motion.div>

      <motion.div 
        className="dashboard-3d"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <MarketOverview cryptoData={cryptoData} loading={loading} />
        <CryptoChart cryptoData={cryptoData} loading={loading} />
        <PortfolioTracker
          portfolio={portfolio}
          portfolioValue={portfolioValue}
          portfolioChange={portfolioChange}
          onAddToPortfolio={addToPortfolio}
        />
      </motion.div>

      <AssistantChat />

      <motion.footer 
        className="footer-3d"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <motion.p
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Crypto Copilot &copy; {new Date().getFullYear()} | Powered by io.net AI | Real-time market data
        </motion.p>
        <p>
          <motion.i 
            className="fas fa-shield-alt"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
          />
          All data is securely processed | Not financial advice
        </p>
      </motion.footer>
    </div>
  );
}

export default App;