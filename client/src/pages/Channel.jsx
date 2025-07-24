import React, { useEffect, useState } from 'react';
import './Channel.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Channel() {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem('username');
  const [userVideos, setUserVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showEdit, setShowEdit] = useState(false);
  const [editData, setEditData] = useState({
    _id: '',
    title: '',
    views: '',
    time: '',
    thumbnail: '',
    videoUrl: '',
  });

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
      console.error('❌ Delete error:', err);
      alert('Error deleting video');
    }
  };

  const handleEditClick = (video) => {
    setEditData(video);
    setShowEdit(true);
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(
        `http://localhost:8080/api/videos/${editData._id}`,
        editData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUserVideos((prev) =>
        prev.map((v) => (v._id === editData._id ? res.data : v))
      );
      setShowEdit(false);
    } catch (err) {
      console.error('❌ Edit failed:', err);
      alert('Failed to update video');
    }
  };

  if (!storedUser) {
    return (
      <div className="channel-page">
        <p>Please log in to view your channel.</p>
      </div>
    );
  }

  return (
    <div className="channel-page">
      <img
        className="channel-banner"
        src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2023/02/one-piece.jpg"
        alt="Banner"
      />

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

      {loading ? (
        <p>Loading videos...</p>
      ) : userVideos.length === 0 ? (
        <p>No videos uploaded yet.</p>
      ) : (
        <div className="channel-videos">
          {userVideos.map((video) => (
            <div key={video._id} className="channel-video-card">
              <video width="100%" height="200" controls poster={video.thumbnail}>
                <source src={video.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <h4>{video.title}</h4>
              <p className="channel-video-meta">
                {video.views} views • {video.time}
              </p>
              <div className="video-actions">
                <button onClick={() => handleEditClick(video)}>Edit</button>
                <button onClick={() => handleDelete(video._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showEdit && (
        <div className="edit-modal">
          <div className="edit-form">
            <h3>Edit Video</h3>
            <input
              type="text"
              name="title"
              value={editData.title}
              onChange={handleEditChange}
              placeholder="Title"
            />
            <input
              type="text"
              name="views"
              value={editData.views}
              onChange={handleEditChange}
              placeholder="Views"
            />
            <input
              type="text"
              name="time"
              value={editData.time}
              onChange={handleEditChange}
              placeholder="Time"
            />
            <input
              type="text"
              name="thumbnail"
              value={editData.thumbnail}
              onChange={handleEditChange}
              placeholder="Thumbnail URL"
            />
            <input
              type="text"
              name="videoUrl"
              value={editData.videoUrl}
              onChange={handleEditChange}
              placeholder="Video URL"
            />
            <div className="edit-buttons">
              <button onClick={handleSaveEdit}>Save</button>
              <button onClick={() => setShowEdit(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Channel;
