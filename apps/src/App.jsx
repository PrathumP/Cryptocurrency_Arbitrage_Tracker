import React from 'react';
import BinanceWebSocketComponent from './Components/Binance';
import CoinbaseWebSocketComponent from './Components/Coinbase';
import KrakenWebSocketComponent from './Components/Kraken';
import BitfinexWebSocketComponent from './Components/Bitfinex';
import HuobiWebSocketComponent from './Components/Huobi';

const App = () => {
  return (
    <div>
      <h1>Cryptocurrency Arbitrage Tracker</h1>
      <BinanceWebSocketComponent />
      <CoinbaseWebSocketComponent />
      <KrakenWebSocketComponent />
      <BitfinexWebSocketComponent />
      <HuobiWebSocketComponent />
      {/* Add other components and UI here */}
    </div>
  );
};

export default App;
