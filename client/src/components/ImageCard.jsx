import React from 'react';
import '../styles/imageCard.scss';

const ImageCard = ({ image }) => {
  return (
    <div className="image-card">
      <img src={image.src} alt={image.name} className="image" />
      <div className="image-info">
        <h3>{image.name}</h3>
        <p><strong>{image.artist}</strong></p>
        <p>{image.description}</p>
      </div>
    </div>
  );
};

export default ImageCard;
