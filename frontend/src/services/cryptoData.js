import { fetchCryptoData as fetchApiData } from './api';

// Cache for cryptocurrency data
let cryptoDataCache = null;
let lastFetchTime = 0;

export const getCachedCryptoData = async () => {
  // Use cache if data is less than 1 minute old
  if (cryptoDataCache && Date.now() - lastFetchTime < 60000) {
    return cryptoDataCache;
  }

  try {
    const data = await fetchApiData();
    cryptoDataCache = data;
    lastFetchTime = Date.now();
    return data;
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    // Return cached data if available
    if (cryptoDataCache) {
      return cryptoDataCache;
    }
    throw error;
  }
};