import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Try1 = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // שליחה לשרת לקבלת רשימת התמונות
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/images');
        setImages(response.data);
      } catch (err) {
        setError('לא ניתן להוריד את התמונות');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return <p>טוען תמונות...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div>
      <h1>גלריית תמונות</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {images.length === 0 ? (
          <p>אין תמונות זמינות</p>
        ) : (
          images.map((image, index) => (
            <div key={index} style={{ margin: '10px' }}>
              <img
                src={`http://localhost:5000/uploads/${image}`}
                alt={`image-${index}`}
                style={{ width: '200px', height: 'auto' }}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Try1;
