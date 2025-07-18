import React from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <header className="header-3d">
      <motion.div
        className="header-content"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, type: "spring", stiffness: 100 }}
      >
        <motion.h1
          className="main-title"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.i 
            className="fas fa-robot title-icon"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          />
          Crypto Copilot
        </motion.h1>
        <motion.p 
          className="subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Your AI-powered cryptocurrency assistant providing real-time insights, market analysis, and personalized guidance
        </motion.p>
        <motion.div 
          className="header-glow"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.div>
    </header>
  );
};

export default Header;