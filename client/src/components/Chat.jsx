import React, { useState, useEffect } from 'react';
import '../styles/chat.scss';
import { io } from 'socket.io-client'; // נשתמש ב-Socket.IO

const socket = io('http://localhost:5000'); // התחברות לשרת WebSocket

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // קבלת הודעות בזמן אמת
    socket.on('chatMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('chatMessage'); // ניקוי ההאזנה
    };
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // שליחה של הודעה לשרת
      socket.emit('chatMessage', { text: newMessage, timestamp: new Date() });
      setNewMessage('');
    }
  };

  return (
    <div className="chat-interface">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className="chat-message">
            <p>{msg.text}</p>
            <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="send massege..."
        />
        <button onClick={handleSendMessage}>send</button>
      </div>
    </div>
  );
};

export default ChatInterface;
