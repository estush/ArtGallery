module.exports = (io) => {
    io.on('connection', (socket) => {
      console.log('A user connected');
  
      // קבלת הודעה
      socket.on('send-message', (message) => {
        console.log('Received message:', message);
        // שולח את ההודעה לכל הלקוחות
        io.emit('receive-message', message);
      });
  
      socket.on('disconnect', () => {
        console.log('User disconnected');
      });
    });
  };
  