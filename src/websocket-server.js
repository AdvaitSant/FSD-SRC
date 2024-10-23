const express = require('express');
const http = require('http');
const redis = require('redis');
const { Server } = require('socket.io');
const app = express();
const port = 3002;

// Set up HTTP server and socket.io
const server = http.createServer(app);
const io = new Server(server);

// Set up Redis client to subscribe to the game channel
const client = redis.createClient();
client.subscribe('tic_tac_toe_channel');

// When Redis gets a message, emit it to all connected clients
client.on('message', (channel, message) => {
    console.log('Received data from Redis:', message);
    io.emit('gameUpdate', message);
});

// Start server
server.listen(port, () => {
    console.log(`WebSocket server running on port ${port}`);
});
