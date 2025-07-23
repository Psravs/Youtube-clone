//importing react library form react
import React from 'react';
import './VideoCard.css'; 

function VideoCard({ video }) {
  // universe 2
  return (
    <div className="video-card">
      <img src={video.thumbnail} alt="thumbnail" className="thumbnail" />
      <h3>{video.title}</h3>
      <p>{video.channel}</p>
      <p>{video.views} • {video.time}</p>
    </div>
  );
}

export default VideoCard;
