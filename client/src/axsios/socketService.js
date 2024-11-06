// src/axsios/socketService.js
import { io } from 'socket.io-client';

// יצירת החיבור לשרת WebSocket
const socket = io('http://localhost:5000');  // שים לב אם אתה נמצא בסביבה של פרודקשן תעדכן את הכתובת

// מאזין להודעות שמתקבלות
export const listenForMessages = (callback) => {
  socket.on('receive-message', (message) => {
    callback(message); // החזרת ההודעה ללקוח
  });
};

// שליחת הודעה לשרת
export const sendMessage = (message) => {
  socket.emit('send-message', message);  // שליחה של ההודעה לשרת
};

// ניתוק מהשרת (למקרה שהלקוח יוצא מהדף או עוזב)
export const disconnectSocket = () => {
  socket.disconnect();
};
