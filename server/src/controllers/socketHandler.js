const messages = [];  // מערך שמכיל את כל ההודעות שנשלחו

const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log('A user connected');

    // שולחים למשתמש את כל ההודעות הישנות ברגע שהוא מתחבר
    socket.emit('load-messages', messages);

    // כאשר מתקבלת הודעה חדשה
    socket.on('send-message', (message) => {
      console.log('Received message:', message);

      // הוספת ההודעה למערך
      messages.push(message);

      // שולחים את ההודעה החדשה לכל המשתמשים המחוברים
      io.emit('receive-message', message);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};

export default socketHandler;
