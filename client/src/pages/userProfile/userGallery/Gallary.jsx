import React from 'react';

const Gallery = ({ images }) => {
  return (
    <div>
      <h2>Image Gallery</h2>
      {images.map((image) => (
        <img key={image.id} src={image.location} alt="Gallery" />
      ))}
    </div>
  );
};

export default Gallery;
