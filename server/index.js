import { startServer } from './src/routes/server.routes.js'; // ייבוא של הפונקציה שמתחילה את השרת
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 5000;

// התחלת השרת
startServer(port);
