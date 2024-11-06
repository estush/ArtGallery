import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // נוסיף את קישור לדף הדיון
import ImageCard from './ImageCard';
import { images } from './images'; // ייבוא המערך מתוך הקובץ images
import '../styles/home.scss';

const ImageGallery2 = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // פונקציה לסינון התמונות לפי שם התמונה או שם האמן
  const filteredImages = images.filter(image => 
    image.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    image.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="homepage">
      <input
        type="text"
        placeholder="Search by name or artist..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="gallery">
        {filteredImages.map(image => (
          <Link to={`/discussion/${image.id}`} key={image.id}>
            <ImageCard image={image} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery2;
