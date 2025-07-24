//imporitng react libarry from react 
import React from 'react';
//importing link from react router dom
import { Link } from 'react-router-dom';
import './VideoCard.css';

function VideoCard({ video }) {

  // universe 2 
  return (
    <div className="video-card">
      <Link to={`/videos/${video._id}`}>  
        <img src={video.thumbnail} alt="thumbnail" className="thumbnail" />
      </Link>
      <Link to={`/watch/${video.id}`}>
        <h3>{video.title}</h3>
      </Link>
      <p>{video.channel}</p>
      <p>{video.views} • {video.time}</p>
    </div>
  );
}

export default VideoCard;
