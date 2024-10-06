const socketIo = require('socket.io');
// const Message = require('../models/Message');

let io;
const onlineUsers = new Map();

const init = (server) => {
  io = socketIo(server, {
    cors: {
      origin: process.env.FRONTEND_URL || "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('login', (userId) => {
      onlineUsers.set(userId, socket.id);
      io.emit('userStatus', { userId, status: 'online' });
    });

    socket.on('logout', (userId) => {
      onlineUsers.delete(userId);
      io.emit('userStatus', { userId, status: 'offline' });
    });

    socket.on('sendMessage', async (data) => {
      const newMessage = new Message(data);
      await newMessage.save();
      io.to(data.recipient).emit('message', newMessage);
    });

    socket.on('typing', ({ senderId, recipientId }) => {
      const recipientSocketId = onlineUsers.get(recipientId);
      if (recipientSocketId) {
        io.to(recipientSocketId).emit('userTyping', { senderId });
      }
    });

    socket.on('stopTyping', ({ senderId, recipientId }) => {
      const recipientSocketId = onlineUsers.get(recipientId);
      if (recipientSocketId) {
        io.to(recipientSocketId).emit('userStoppedTyping', { senderId });
      }
    });

    socket.on('disconnect', () => {
      const userId = [...onlineUsers.entries()].find(([_, id]) => id === socket.id)?.[0];
      if (userId) {
        onlineUsers.delete(userId);
        io.emit('userStatus', { userId, status: 'offline' });
      }
      console.log('Client disconnected');
    });
  });
};

module.exports = { init };