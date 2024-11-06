import React, { useState, useEffect } from 'react';
import '../styles/imageGallery.scss';
import { images } from './images'; // ייבוא המערך images

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000); // כל 3 שניות התמונה תשתנה

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="image-gallery">
      <h1>Art Gallery</h1>
      <div className="gallery">
        <div className="image fade-in">
          <img src={images[currentImage].src} alt={images[currentImage].name} />
        </div>
        <div className="image-info">
          <h2>{images[currentImage].name}</h2>
          <h3>{images[currentImage].artist}</h3>
          <p>{images[currentImage].description}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
