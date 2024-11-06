import React, { useState } from 'react';
import '../styles/chatBot.scss';
import { getAiAnswer } from '../axsios/openAi.js'; // נייבא את פונקציית ה-API

const ChatBot = () => {
  const [input, setInput] = useState('');  // לשמירת הקלט מהמשתמש
  const [messages, setMessages] = useState([]);  // לשמירת כל ההודעות
  const [isThinking, setIsThinking] = useState(false);  // מצב של "מחשב חושב"
  const [isOpen, setIsOpen] = useState(true);  // מצב אם הצ'אט פתוח או סגור

  // עדכון קלט המשתמש
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // שליחת ההודעה (הפונקציה המרכזית)
  const handleSubmit = async (e) => {
    e.preventDefault();  // מונע את הרענון של הדף בעת שליחה
    if (input.trim() === '') return;  // אם הקלט ריק, אל תשלח הודעה

    // הוספת הודעת המשתמש לממשק
    setMessages([...messages, { type: 'user', text: input }]);
    setInput('');
    setIsThinking(true);  // מציין שהמחשב חושב על תשובה

    try {
      // קריאה לשרת לקבלת התשובה
      const response = await getAiAnswer(input);  // מתבצע הקריאה לשרת (צד שרת)
      
      // הוספת התשובה לממשק
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'bot', text: response },  // התשובה מה-API
      ]);
    } catch (err) {
      // במקרה של שגיאה
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'bot', text: 'הייתה בעיה בהשגת התשובה. אנא נסה שנית.' },
      ]);
    } finally {
      setIsThinking(false);  // מחשבה סיימה
    }
  };

  // טיפול במקשים בזמן הקלדה
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);  // אם נלחץ Enter, שולחים את ההודעה
    }
  };

  // עדכון שורת הקלט בצורה דינמית
  const handleTextareaInput = (e) => {
    const lines = e.target.value.split('\n').length;
    setInput(e.target.value);
    if (lines <= 10) {
      e.target.rows = lines;  // התאמת שורת הקלט בהתאם לכמות השורות
    }
  };

  // פונקציה לסגירת הצ'אט
  const handleCloseChat = () => {
    setIsOpen(false);  // מציין שהצ'אט סגור
  };

  return (
    <>
      {isOpen && (  // אם הצ'אט פתוח, נציג את הרכיב
        <div className="chatbot">
          {/* כפתור סגירה */}
          <button className="close-btn" onClick={handleCloseChat}>
            ✖
          </button>

          <div className="messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.type}`}>
                {msg.type === 'user' && <div className="user-icon">🗨️</div>}
                <div className="message-text">{msg.text}</div>
                {msg.type === 'bot' && isThinking && (
                  <div className="thinking-icon">⏳</div>
                )}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="input-form">
            <textarea
              value={input}
              onChange={handleInputChange}
              onInput={handleTextareaInput}
              placeholder=" ask question..."
              onKeyDown={handleKeyDown}
              rows={1}
              className="input-textarea"
            />
            <button type="submit">send</button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBot;
