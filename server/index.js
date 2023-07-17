const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

server.listen(5000, () => {
  console.log('Server listening on port 5000.');
});

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('Socket.IO connection established.');

  // Handle Socket.IO messages or events, if needed
  socket.on('message', (message) => {
    console.log('Received message:', message);
  });
});
