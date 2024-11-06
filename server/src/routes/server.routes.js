// server.routes.js

import express from 'express';
import path from 'path';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';
import dotenv from 'dotenv';
import imageRoutes from '../controllers/imageRoutes.js';  // מודול התמונות
import openAiRoutes from './routes.js';  // נתיבים עבור OpenAI
import socketHandler from '../controllers/socketHandler.js';  // מודול הסוקטים

dotenv.config();

const app = express();
const server = http.createServer(app);

// חישוב נתיב תיקיית uploads
const __dirname = path.dirname(new URL(import.meta.url).pathname);  // דרך לקבלת נתיב תיקיית הקובץ הנוכחי

// תיקיית uploads בה נשמרות התמונות
const uploadsDir = path.join(__dirname, '..', 'uploads');

// הגדרת CORS כך שהשרת יאפשר חיבורים מהדומיין של הלקוח (נניח, React על localhost:3000)
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
};
app.use(cors(corsOptions));  // הפעלת ה-CORS על כל הבקשות

// הגדרת תיקיית uploads כנתיב סטטי כך שניתן יהיה לגשת לתמונות ישירות
app.use('/uploads', express.static(uploadsDir));  // תיקיית uploads תוגש ישירות

// הגדרת נתיבים עבור התמונות ו-OpenAI
app.use('/api', imageRoutes);  // ניתוב לתמונות
app.use('/api/openai', openAiRoutes);  // ניתוב ל-OpenAI

// הגדרת WebSocket
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',  // הוספת ה-Origin עבור Socket.IO
    methods: ['GET', 'POST'],
  }
});

// התחלת השרת עם WebSocket
socketHandler(io);

// חיבור הנתיב הראשי
app.get('/', (req, res) => {
  res.send('Server is up and running');
});

// פונקציה שמתחילה את השרת ומאזינה על פורט 5000
const startServer = (port) => {
  server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

// יצוא הפונקציה startServer כדי שתוכל להיות מיובאת בקובץ הראשי
export { startServer };  // חשוב: יש לוודא שהפונקציה מיוצאת כך
