import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/variables.css';
import './styles/main.css';
import App from './App';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faRobot, faChartLine, faChartBar, faWallet,
  faPlus, faPaperPlane, faShieldAlt, faKey,
  faSave
} from '@fortawesome/free-solid-svg-icons';
import { faBitcoin, faEthereum, faRedditAlien } from '@fortawesome/free-brands-svg-icons';
library.add(
  faRobot, faChartLine, faChartBar, faWallet,
  faPlus, faPaperPlane, faShieldAlt, faKey, faSave,
  faBitcoin, faEthereum, faRedditAlien
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);