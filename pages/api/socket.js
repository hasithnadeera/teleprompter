// pages/api/socket.js

import { Server } from 'socket.io';

const ioHandler = (req, res) => {
  if (!res.socket.server.io) {
    console.log('*First use, starting Socket.IO');
    const io = new Server(res.socket.server, {
      path: '/api/socketio',
      addTrailingSlash: false,
    });

    io.on('connection', socket => {
      console.log('Client connected:', socket.id);

      socket.on('pushScript', (data) => {
        // Broadcast the script content to all connected clients except sender
        socket.broadcast.emit('scriptUpdate', data);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
      });
    });

    res.socket.server.io = io;
  } else {
    console.log('Socket.IO already running');
  }
  res.end();
};

export default ioHandler;
