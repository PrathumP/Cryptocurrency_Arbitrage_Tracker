import React, { useEffect, useState } from 'react';
import WebSocketClient from 'websocket';

const HuobiWebSocketComponent = () => {
  const [latestPrice, setLatestPrice] = useState(null);

  useEffect(() => {
    const socket = new WebSocket('wss://api.huobi.pro/ws');

    socket.onopen = () => {
      console.log('WebSocket connection established.');
      // Subscribe to the ticker channel for the BTC/USDT trading pair
      socket.send(
        JSON.stringify({
          sub: 'market.btccusdt.trade.detail',
          id: 'btcusdt',
        })
      );
    };

    socket.onmessage = (event) => {
      // Handle heartbeat messages
      if (event.data === 'ping') {
        socket.send('pong'); // Respond to the server's ping message with a pong message
        return;
      }

      // Parse the received data as JSON
      try {
        const data = JSON.parse(event.data);

        if (data && data.ping) {
          // Handle heartbeat messages in JSON format (optional)
          socket.send(JSON.stringify({ pong: data.ping }));
          return;
        }

        if (data && data.ch === 'market.btccusdt.trade.detail' && data.tick) {
          const price = parseFloat(data.tick.data[0].price);
          console.log('Received real-time trade data:', data.tick.data[0]);

          // Update the latest price in state
          setLatestPrice(price);
        }
      } catch (error) {
        console.error('Error parsing JSON:', error);
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
      <p>Huobi WebSocket connection is active.</p>
      <p>Latest BTC price in USDT: {latestPrice}</p>
    </div>
  );
};

export default HuobiWebSocketComponent;
