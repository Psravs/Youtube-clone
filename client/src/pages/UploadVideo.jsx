// Importing React and hooks
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UploadVideo.css';

function UploadVideo() {
  // useState for video form data
  const [videoData, setVideoData] = useState({
    title: '',
    views: '',
    time: '',
    thumbnail: '',
    videoUrl: '',
    tags: '',
  });

  // using useNavigate hook for redirection
  const navigate = useNavigate();

  // handle form field change
  const handleChange = (e) => {
    setVideoData({ ...videoData, [e.target.name]: e.target.value });
  };

  // handle form submission/upload
  const handleUpload = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (!token || !username) {
      alert("Please login to upload a video.");
      return;
    }

    try {
      const res = await axios.post(
        'http://localhost:8080/api/videos',
        {
          ...videoData,
          channel: username,
          tags: videoData.tags.split(',').map(tag => tag.trim())
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("Video Uploaded!");
      navigate('/channel'); // ✅ redirecting to channel page after successful upload
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed. Please try again.");
    }
  };

  // universe 2: UI
  return (
    <div className="upload-form-container">
      <h2>Upload Video</h2>
      <form className="upload-form" onSubmit={handleUpload}>
        <input type="text" name="title" placeholder="Title" onChange={handleChange} required />
        <input type="text" name="views" placeholder="Views" onChange={handleChange} />
        <input type="text" name="time" placeholder="Time" onChange={handleChange} />
        <input type="text" name="thumbnail" placeholder="Thumbnail URL" onChange={handleChange} />
        <input type="text" name="videoUrl" placeholder="Video URL" onChange={handleChange} required />
        <input type="text" name="tags" placeholder="Tags (comma separated)" onChange={handleChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default UploadVideo;
