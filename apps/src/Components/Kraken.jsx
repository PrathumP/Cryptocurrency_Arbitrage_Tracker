import React, { useEffect, useState } from 'react';
import WebSocketClient from 'websocket';

const KrakenWebSocketComponent = () => {
  const [latestPrice, setLatestPrice] = useState(null);

  useEffect(() => {
    const socket = new WebSocket('wss://ws.kraken.com');

    socket.onopen = () => {
      console.log('WebSocket connection established.');
      // Subscribe to the BTC/USD pair for trade data
      socket.send(
        JSON.stringify({
          event: 'subscribe',
          pair: ['XBT/USD'],
          subscription: {
            name: 'trade',
          },
        })
      );
    };

    socket.onmessage = (event) => {
      const tradeData = JSON.parse(event.data);
      const tradeInfo = tradeData[1];
      const price = parseFloat(tradeInfo[0]);
      console.log('Received real-time trade data:', tradeInfo);

      // Update the latest price in state
      setLatestPrice(price);
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

  // Fetch data every 5 seconds (optional, not needed for Kraken WebSocket)
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Send a ping message to the WebSocket to keep the connection alive (optional)
      socket.send(JSON.stringify({ event: 'ping' }));
    }, 4000);

    // Clean up the interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <p>Kraken WebSocket connection is active.</p>
      <p>Latest BTC price in USD: {latestPrice}</p>
    </div>
  );
};

export default KrakenWebSocketComponent;
