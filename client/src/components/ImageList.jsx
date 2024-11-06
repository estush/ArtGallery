// src/components/ImageList.js
import React, { useEffect, useState } from 'react';
import { images } from '../images';  // נתיב לקובץ התמונות שלך

const ImageList = () => {
  const [imageSizes, setImageSizes] = useState([]);

  // פונקציה שמביאה את גודל הקובץ של התמונה
  const getImageSize = (src) => {
    return new Promise((resolve, reject) => {
      // שולחים בקשה מסוג HEAD כדי לבדוק את גודל הקובץ (Content-Length)
      fetch(src, { method: 'HEAD' })
        .then((response) => {
          if (!response.ok) {
            reject('לא ניתן לשלוף את הנתונים');
            return;
          }
          // שליפת גודל הקובץ מכותרת ה-HTTP "Content-Length"
          const sizeInBytes = response.headers.get('Content-Length');
          resolve(sizeInBytes);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  // שליפת גודל הקובץ של כל התמונה
  useEffect(() => {
    const fetchImageSizes = async () => {
      const sizes = await Promise.all(
        images.map(async (image) => {
          try {
            const size = await getImageSize(image.src);
            return { ...image, size: formatBytes(size) };
          } catch (error) {
            console.error('Error fetching image size:', error);
            return { ...image, size: 'לא זמין' };
          }
        })
      );
      setImageSizes(sizes);  // עדכון הסטייט עם המידע
    };

    fetchImageSizes();
  }, []);  // ריצה אחת בלבד בעת הטעינה של הקומפוננטה

  // פונקציה להמיר בייטים ל-KB/MB בצורה קריאה
  const formatBytes = (bytes) => {
    if (!bytes) return 'unviliuble';
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
  };

  return (
    <div>
      <h1>תמונות ונתונים</h1>
      <ul>
        {imageSizes.map((image) => (
          <li key={image.id}>
            <img src={image.src} alt={image.name} style={{ maxWidth: '200px' }} />
            <h3>{image.name}</h3>
            <p><strong>Artist:</strong> {image.artist}</p>
            <p><strong>description:</strong> {image.description}</p>
            <p><strong>image size:</strong> {image.size}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageList;
