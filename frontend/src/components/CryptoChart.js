import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Chart from 'chart.js/auto';
import GlassCard from './GlassCard';

const CryptoChart = ({ cryptoData, loading }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (loading || !cryptoData || cryptoData.length === 0) return;

    // Find Bitcoin data
    const bitcoin = cryptoData.find(c => c.id === 'bitcoin');
    if (!bitcoin) return;

    // Generate mock data for the chart
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const basePrice = bitcoin.current_price;
    const data = labels.map((_, i) => {
      const variation = (Math.random() * 0.04 - 0.02) * (i + 1);
      return basePrice * (1 + variation);
    });

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Bitcoin Price (USD)',
          data: data,
          borderColor: '#00b4db',
          backgroundColor: 'rgba(0, 180, 219, 0.1)',
          borderWidth: 3,
          pointRadius: 4,
          pointBackgroundColor: '#fff',
          tension: 0.3,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(26, 26, 46, 0.9)',
            titleColor: '#fff',
            bodyColor: '#f0f0f0',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            borderWidth: 1,
            padding: 12,
            displayColors: false
          }
        },
        scales: {
          y: {
            grid: {
              color: 'rgba(255, 255, 255, 0.05)'
            },
            ticks: {
              color: '#a0a0c0',
              callback: function(value) {
                return '$' + value.toLocaleString();
              }
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: '#a0a0c0'
            }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [cryptoData, loading]);

  if (loading) {
    return (
      <GlassCard className="chart-card">
        <motion.h2 className="card-title">
          <i className="fas fa-chart-bar"></i> BTC Price (7D)
        </motion.h2>
        <div className="chart-container-3d loading-placeholder">
          <motion.div 
            className="loading-chart-3d"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="chart-card" delay={0.2}>
      <motion.h2 
        className="card-title"
        whileHover={{ scale: 1.05 }}
      >
        <motion.i 
          className="fas fa-chart-bar"
          animate={{ scaleY: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        />
        BTC Price (7D)
      </motion.h2>
      <motion.div 
        className="chart-container-3d"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <canvas ref={chartRef}></canvas>
      </motion.div>
    </GlassCard>
  );
};

export default CryptoChart;