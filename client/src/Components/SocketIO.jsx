import React, { useEffect } from 'react';
import io from 'socket.io-client';

const SocketIOComponent = () => {
  useEffect(() => {
    const socket = io('http://localhost:5000');

    socket.on('connect', () => {
      console.log('Socket.IO connection established.');
    });

    socket.on('message', (data) => {
      console.log('Received real-time data:', data);
      // Process the real-time data (e.g., update state with new prices)
    });

    socket.on('disconnect', () => {
      console.log('Socket.IO connection closed.');
    });

    // Clean up the Socket.IO connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return <div>Socket.IO connection is active.</div>;
};

export default SocketIOComponent;
