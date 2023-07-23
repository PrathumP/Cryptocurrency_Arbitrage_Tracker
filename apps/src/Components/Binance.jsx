import React, { useEffect, useState } from 'react';
import WebSocketClient from 'websocket';

const BinanceWebSocketComponent = () => {
  const [latestPrice, setLatestPrice] = useState(null);

  useEffect(() => {
    const socket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade');

    socket.onopen = () => {
      console.log('WebSocket connection established.');
    };

    socket.onmessage = (event) => {
      const tradeData = JSON.parse(event.data);
      const price = parseFloat(tradeData.p); // Extract the price from the trade data

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

  // Fetch data every 5 seconds
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
      <p>Binance WebSocket connection is active.</p>
      <p>Latest BTC price in USD: {latestPrice}</p>
    </div>
  );
};

export default BinanceWebSocketComponent;
