import React, { useState, useEffect } from 'react';
import Gallery from './Gallary';
import UploadForm from './UploadForm';

export default function UserGallery() {
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    try {
      const response = await fetch('"http://localhost:3001/api/images/upload');
      const data = await response.json();

      if (data.success) {
        setImages(data.images);
      } else {
        console.error('Failed to fetch images:', data.error);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div>
       upload images
      {/* <UploadForm />
      <Gallery images={images} /> */}
    </div>
  );
}

