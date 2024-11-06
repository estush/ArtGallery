import express from 'express';
import fs from 'fs';
import path from 'path';

// הגדרת תיקיית התמונות
const __dirname = path.dirname(new URL(import.meta.url).pathname);  // נתיב הקובץ הנוכחי
const uploadsDir = path.join(__dirname, '..', 'uploads');  // תיקיית ה-uploads

const router = express.Router();

// נתיב שמחזיר את רשימת כל התמונות בתיקיית uploads
router.get('/images', (req, res) => {
  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      return res.status(500).send('שגיאה בקריאת הקבצים בתיקייה');
    }

    // סינון קבצים עם סיומות תמונה
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/.test(file));

    // אם לא נמצאו תמונות
    if (imageFiles.length === 0) {
      return res.status(404).send('לא נמצאו תמונות בתיקיית uploads');
    }

    // החזרת רשימת התמונות
    res.json(imageFiles);
  });
});

// נתיב להצגת תמונה בודדת לפי שם קובץ
router.get('/images/:imageName', (req, res) => {
  const { imageName } = req.params;
  const imagePath = path.join(uploadsDir, imageName);

  fs.access(imagePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send('תמונה לא נמצאה');
    }

    // שליחת התמונה ללקוח
    res.sendFile(imagePath);
  });
});

export default router;
