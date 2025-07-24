// Importing React and hooks
import React, { useEffect, useState } from 'react';
// Importing style file
import './Channel.css';
// Importing useNavigate from react-router-dom
import { useNavigate } from 'react-router-dom';
// Importing axios for API requests
import axios from 'axios';

function Channel() {
  // universe 1: state and hooks
  const navigate = useNavigate();
  const storedUser = localStorage.getItem('username');
  const [userVideos, setUserVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetching videos uploaded by current user from DB
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/videos');
        const filtered = res.data.filter(
          (video) => video.channel === storedUser
        );
        setUserVideos(filtered);
      } catch (err) {
        console.error('❌ Failed to fetch videos:', err);
      } finally {
        setLoading(false);
      }
    };

    if (storedUser) fetchVideos();
  }, [storedUser]);

  // Handle delete video
  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure to delete this video?');
    if (!confirm) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8080/api/videos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserVideos((prev) => prev.filter((v) => v._id !== id));
    } catch (err) {
      alert('Error deleting video');
    }
  };

  // universe 2: UI
  if (!storedUser) {
    return (
      <div className="channel-page">
        <p>Please log in to view your channel.</p>
      </div>
    );
  }

  return (
    <div className="channel-page">
      {/* Banner image on top */}
      <img
        className="channel-banner"
        src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2023/02/one-piece.jpg"
        alt="Banner"
      />

      {/* Channel header with avatar, name and upload button */}
      <div className="channel-header">
        <div className="channel-avatar-icon">
          <span>{storedUser?.charAt(0).toUpperCase()}</span>
        </div>
        <div>
          <h2>{storedUser}'s Channel</h2>
          <p className="channel-description">Welcome to your channel</p>
        </div>
        <button onClick={() => navigate('/upload-video')} className="upload-btn">
          Upload Video
        </button>
      </div>

      {/* Loading, empty or filled videos */}
      {loading ? (
        <p>Loading videos...</p>
      ) : userVideos.length === 0 ? (
        <p>No videos uploaded yet.</p>
      ) : (
        <div className="channel-videos">
          {userVideos.map((video) => (
            <div key={video._id} className="channel-video-card">
              <img src={video.thumbnail} alt={video.title} />
              <h4>{video.title}</h4>
              <p className="channel-video-meta">
                {video.views} views • {video.time}
              </p>
              <div className="video-actions">
                <button onClick={() => navigate(`/edit/${video._id}`)}>
                  Edit
                </button>
                <button onClick={() => handleDelete(video._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Channel;
