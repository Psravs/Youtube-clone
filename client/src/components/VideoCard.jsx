import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './VideoCard.css';
import axios from 'axios';

function VideoCard({ video }) {
  const [likes, setLikes] = useState(video.likes || 0);
  const [dislikes, setDislikes] = useState(video.dislikes || 0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleLike = async () => {
    try {
      const res = await axios.post(`http://localhost:8080/api/videos/like/${video._id}`);
      setLikes(res.data.likes);
      setLiked(true);
      setDisliked(false); //reset if needed
    } catch (err) {
      console.error("Like error:", err);
    }
  };

  const handleDislike = async () => {
    try {
      const res = await axios.post(`http://localhost:8080/api/videos/dislike/${video._id}`);
      setDislikes(res.data.dislikes);
      setDisliked(true);
      setLiked(false); //reset if needed
    } catch (err) {
      console.error("Dislike error:", err);
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
        <button
          onClick={handleLike}
          style={{ color: liked ? 'green' : 'black' }}
        >
          👍 {likes}
        </button>
        <button
          onClick={handleDislike}
          style={{ color: disliked ? 'red' : 'black' }}
        >
          👎 {dislikes}
        </button>
      </div>
    </div>
  );
}

export default VideoCard;
