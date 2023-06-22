import React, { useState, useEffect } from "react";
import Gallery from "./Gallary";


export default function UserGallery() {
  // const [images, setImages] = useState([]);

  // const fetchImages = async () => {
  //   try {
  //     const response = await fetch('"http://localhost:3001/api/images/upload');
  //     const data = await response.json();

  //     if (data.success) {
  //       setImages(data.images);
  //     } else {
  //       console.error('Failed to fetch images:', data.error);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching images:', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchImages();
  // }, []);
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/images")
      .then((response) => response.json())
      .then((data) => {
        setImages(data.images);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  }, []);
  return (
    <div>
      {images.map((image) => (
        <div key={image.id}>
          <img
            src={`http://localhost:3001/images/${image.fileName}`}
            alt={image.fileName}
          />
          <p>Location: {image.location}</p>
          <p>User ID: {image.userId}</p>
        </div>
      ))}
    </div>
  );
}
