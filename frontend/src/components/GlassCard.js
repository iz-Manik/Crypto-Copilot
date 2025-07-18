import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '', delay = 0, ...props }) => {
  return (
    <motion.div
      className={`glass-card ${className}`}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.02,
        rotateX: 5,
        rotateY: 5,
        transition: { duration: 0.2 }
      }}
      {...props}
    >
      <div className="glass-card-inner">
        {children}
      </div>
    </motion.div>
  );
};

export default GlassCard;