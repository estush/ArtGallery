import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { images } from './images'; // ייבוא מערך התמונות
import { listenForMessages, sendMessage, disconnectSocket } from '../axsios/socketService';  // ייבוא פונקציות סוקט
import '../styles/discussion.scss'; // סגנונות לדף הדיון

const Discussion = () => {
  const { id } = useParams();  // קבלת ה-id מה-URL
  const [image, setImage] = useState(null);
  const [messages, setMessages] = useState([]);  // המערך ששומר את כל ההודעות
  const [newMessage, setNewMessage] = useState('');
  const [showDetails, setShowDetails] = useState(false); // סטייט לאם להציג את המידע או לא

  // פונקציה שמביאה את גודל התמונה והמידע שלה
  const getImageDetails = (src) => {
    return new Promise((resolve, reject) => {
      // שליפת גודל התמונה
      fetch(src, { method: 'HEAD' })
        .then((response) => {
          if (!response.ok) {
            reject('לא ניתן לשלוף את הנתונים');
            return;
          }
          const sizeInBytes = response.headers.get('Content-Length');
          const sizeFormatted = formatBytes(sizeInBytes);
          
          // שליפת רזולוציה של התמונה
          const img = new Image();
          img.src = src;
          img.onload = () => {
            const resolution = `${img.width}x${img.height}`;
            resolve({ size: sizeFormatted, resolution });
          };
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  // פונקציה להמיר בייטים ל-KB/MB בצורה קריאה
  const formatBytes = (bytes) => {
    if (!bytes) return 'לא זמין';
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
  };

  // שימוש ב- useEffect כדי לטעון את התמונה שנבחרה לפי ה-id
  useEffect(() => {
    const selectedImage = images.find((img) => img.id === parseInt(id));  // מוצא את התמונה שנבחרה
    setImage(selectedImage); // עדכון מצב התמונה

    // כאשר התמונה נטענת, נשלוף את המידע
    if (selectedImage) {
      getImageDetails(selectedImage.src)
        .then((details) => {
          setImage({ ...selectedImage, ...details }); // עדכון התמונה עם המידע שלה
        })
        .catch(() => {
          setImage({ ...selectedImage, size: 'לא זמין', resolution: 'לא זמין' }); // במקרה של שגיאה
        });
    }

    // מאזין להודעות חדשות וכולל את הפונקציה של קבלת ההודעות
    listenForMessages('receive-message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // מאזין להודעות ישנות כשהמשתמש מתחבר
    listenForMessages('load-messages', (loadedMessages) => {
      setMessages(loadedMessages);  // טוען את כל ההודעות כאשר המשתמש מתחבר
    });

    return () => {
      // ניתוק מהסוקט בעת עזיבת הדף
      disconnectSocket();  // עכשיו הפונקציה הזו תהיה זמינה
    };
  }, [id]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return; // אם ההודעה ריקה, לא שולחים אותה

    // יצירת ההודעה
    const message = {
      content: newMessage,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    sendMessage(message);  // שולחים את ההודעה לשרת
    setMessages((prevMessages) => [...prevMessages, message]);  // עדכון מצב ההודעות
    setNewMessage('');  // איפוס תיבת ההודעה
  };

  if (!image) return <div className="loading">Loading...</div>;  // אם התמונה לא נטענה, מציגים הודעת טעינה

  return (
    <div className="discussion-page">
      {/* הצגת התמונה */}
      <div className="image-container">
        <div className="image-info">
          <h2 className="image-name">{image.name}</h2>
          <p className="artist-name">Artist: {image.artist}</p>
          <p className="image-description">{image.description}</p>
        </div>

        {/* הצגת התמונה עם מעבר עכבר */}
        <div className="image-wrapper">
          <img
            src={image.src}
            alt={image.name}
            className="image-detail"
            onMouseEnter={() => setShowDetails(true)} // הצגת פרטים בעת מעבר עכבר
            onMouseLeave={() => setShowDetails(false)} // הסתרת פרטים בעת יציאה ממעבר העכבר
          />
          {/* הצגת פרטי התמונה (גודל ורזולוציה) בעת מעבר עכבר */}
          {showDetails && (
            <div className="image-details-popup">
              <p>image size: {image.size}</p>
              <p>Resolution: {image.resolution}</p>
            </div>
          )}
        </div>
      </div>

      {/* ממשק צ'אט */}
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              <p className="message-content">{msg.content}</p>
              <span className="message-timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</span>
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            className="chat-input-field"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button className="chat-send-button" onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Discussion;
