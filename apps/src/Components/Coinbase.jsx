import React, { useEffect, useState } from 'react';
import WebSocketClient from 'websocket';

const CoinbaseWebSocketComponent = () => {
  const [latestPrice, setLatestPrice] = useState(null);

  useEffect(() => {
    const socket = new WebSocket('wss://ws-feed.pro.coinbase.com');

    socket.onopen = () => {
      console.log('WebSocket connection established.');
      // Subscribe to BTC-USD channel for trade data
      socket.send(
        JSON.stringify({
          type: 'subscribe',
          product_ids: ['BTC-USD'],
          channels: ['ticker'],
        })
      );
    };

    socket.onmessage = (event) => {
      const tradeData = JSON.parse(event.data);
      if (tradeData.type === 'ticker') {
        const price = parseFloat(tradeData.price);
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

  // Fetch data every 5 seconds (optional, not needed for Coinbase WebSocket)
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Send a ping message to the WebSocket to keep the connection alive (optional)
      socket.send(JSON.stringify({ event: 'ping' }));
    }, 10000);

    // Clean up the interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <p>Coinbase WebSocket connection is active.</p>
      <p>Latest BTC price in USD: {latestPrice}</p>
    </div>
  );
};

export default CoinbaseWebSocketComponent;
