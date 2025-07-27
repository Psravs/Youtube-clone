
//imporitng react libarry and useState hook
import React, { useState } from 'react';
//imporitng Link from react router dom
import { Link } from 'react-router-dom';
import './VideoCard.css';
// importing axios library for making HTTP requests
import axios from 'axios';

function VideoCard({ video }) {
  // universe 1
  // using states for likes, dislikes
  const [likes, setLikes] = useState(video.likes || 0);
  const [dislikes, setDislikes] = useState(video.dislikes || 0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  // like function
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

  // dislike function

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

  // universe 2 
  return (
    // video player page - thumbanil, video, video details, like , dislike options 
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
