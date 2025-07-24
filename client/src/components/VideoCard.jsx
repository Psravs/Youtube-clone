import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './VideoCard.css';

function VideoCard({ video }) {
  const [likes, setLikes] = useState(video.likes || 0);
  const [dislikes, setDislikes] = useState(video.dislikes || 0);

  const handleLike = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Please login to like");
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:8080/api/videos/like/${video._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setLikes(res.data.likes);
      setDislikes(res.data.dislikes); // optional update
    } catch (err) {
      console.error("Error liking video", err);
    }
  };

  const handleDislike = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Please login to dislike");
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:8080/api/videos/dislike/${video._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setDislikes(res.data.dislikes);
      setLikes(res.data.likes); // optional update
    } catch (err) {
      console.error("Error disliking video", err);
    }
  };

  return (
    <div className="video-card">
      <Link to={`/videos/${video._id}`}>
        <img src={video.thumbnail} alt="thumbnail" className="thumbnail" />
      </Link>

      <Link to={`/videos/${video._id}`}>
        <h3>{video.title}</h3>
      </Link>

      <p>{video.channel}</p>
      <p>{video.views} • {video.time}</p>

      <div className="video-actions">
        <button onClick={handleLike}>👍 {likes}</button>
        <button onClick={handleDislike}>👎 {dislikes}</button>
      </div>
    </div>
  );
}

export default VideoCard;
