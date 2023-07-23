import React, { useEffect, useState } from 'react';
import WebSocketClient from 'websocket';

const BitfinexWebSocketComponent = () => {
  const [latestPrice, setLatestPrice] = useState(null);

  useEffect(() => {
    const socket = new WebSocket('wss://api-pub.bitfinex.com/ws/2');

    socket.onopen = () => {
      console.log('WebSocket connection established.');
      // Subscribe to the ticker channel for the BTC/USD pair
      socket.send(
        JSON.stringify({
          event: 'subscribe',
          channel: 'ticker',
          symbol: 'tBTCUSD',
        })
      );
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // Check if data is an array and contains the ticker data
      if (Array.isArray(data) && data.length > 1 && data[1] === 'hb') {
        // Ignore heartbeat messages (data[1] === 'hb')
        return;
      }

      // Check if data is an array and contains the ticker data
      if (Array.isArray(data) && data.length > 1 && Array.isArray(data[1])) {
        const tickerData = data[1];
        const price = parseFloat(tickerData[6]);
        console.log('Received real-time trade data:', tickerData);

        // Update the latest price in state
        setLatestPrice(price);
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = (event) => {
      console.log('WebSocket connection closed:', event);
    };

    // Clean up the WebSocket connection on component unmount
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      <p>Bitfinex WebSocket connection is active.</p>
      <p>Latest BTC price in USD: {latestPrice}</p>
    </div>
  );
};

export default BitfinexWebSocketComponent;
