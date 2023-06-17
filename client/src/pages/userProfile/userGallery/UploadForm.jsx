import React, { useState } from 'react';

const UploadForm = () => {
  const [location, setLocation] = useState('');
  const [userId, setUserId] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    if (!location || !userId || !selectedFile) {
      console.error('Please fill in all the fields');
      return;
    }

    const formData = new FormData();
    formData.append('location', location);
    formData.append('userId', userId);
    formData.append('image', selectedFile);

    try {
      
    const response = await fetch('/api/images/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        console.log('Image uploaded successfully');
        // You can update the gallery component state or fetch the updated images from the server
      } else {
        console.error('Failed to upload image:', data.error);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <h2>Upload Form</h2>
      <form onSubmit={handleUpload}>
        <label>
          Location:
          <input type="text" value={location} onChange={handleLocationChange} />
        </label>
        <br />
        <label>
          User ID:
          <input type="text" value={userId} onChange={handleUserIdChange} />
        </label>
        <br />
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadForm;
