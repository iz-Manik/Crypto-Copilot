require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// io.net API configuration
const IO_NET_API_URL = "https://api.intelligence.io.solutions/api/v1/chat/completions";
const API_KEY = process.env.IO_NET_API_KEY;

// Proxy endpoint for io.net API
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    const response = await axios.post(IO_NET_API_URL, {
      model: "mistralai/Mistral-Large-Instruct-2411",
      messages: [
        {
          role: "system",
          content: "You are Crypto Copilot, an expert cryptocurrency assistant. Provide accurate, helpful information about cryptocurrencies, markets, trading, and blockchain technology. Be concise but informative. Format responses for easy reading. Current date: " + new Date().toISOString().split('T')[0]
        },
        ...messages
      ],
      max_tokens: 500,
      temperature: 0.7
    }, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('AI request error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get AI response' });
  }
});

// Crypto data endpoint
app.get('/api/crypto-data', async (req, res) => {
  try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana,dogecoin&order=market_cap_desc&per_page=4&page=1&sparkline=false&price_change_percentage=24h'
    );

    res.json(response.data);
  } catch (error) {
    console.error('Crypto data error:', error);
    res.status(500).json({ error: 'Failed to fetch cryptocurrency data' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});