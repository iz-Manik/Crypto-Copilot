import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export const fetchCryptoData = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/crypto-data`);
  return response.data;
};

export const sendMessage = async (messages) => {
  const response = await axios.post(`${API_BASE_URL}/api/chat`, { messages });
  return response.data.choices[0].message.content;
};