//imporitng react , useState hook from react 
import React, { useState, useEffect } from 'react';
import './Channel.css';

function Channel() {
  //universe 1 
  // states fro performing individual tasks on channel page
  const [username, setUsername] = useState("");
  const [videos, setVideos] = useState([]);
  const [visiblePlayers, setVisiblePlayers] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', thumbnail: '', videoUrl: '' });
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [newVideo, setNewVideo] = useState({ title: '', thumbnail: '', videoUrl: '', views: '', uploaded: '' });

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUsername(storedUser);

      const userKey = `${storedUser}-videos`;
      let userVideos = JSON.parse(localStorage.getItem(userKey)); 

      if (!userVideos || userVideos.length === 0) {
        // channel videos data
        userVideos = [
          {
            title: "Nature Relaxation 🌿",
            thumbnail: "https://images.unsplash.com/photo-1533371452382-d45a9da51ad9?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            videoUrl: "https://cdn.pixabay.com/video/2023/06/28/169249-840702546_large.mp4",
            views: "12K",
            uploaded: "2 days ago"
          },
          {
            title: "Peaceful Meadow 🌿",
            thumbnail: "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            videoUrl: "https://cdn.pixabay.com/video/2024/05/05/210813_large.mp4",
            views: 830,
            uploaded: "5 days ago"
          }
        ];
        localStorage.setItem(userKey, JSON.stringify(userVideos));
      }

      setVideos(userVideos || []);
      setVisiblePlayers(new Array(userVideos.length).fill(false));
    }
  }, []);

  // when clicked on thumbnail 
  const handleThumbnailClick = (index) => {
    const updated = [...visiblePlayers];
    updated[index] = true;
    setVisiblePlayers(updated);
  };

  // when clicked on delte
  const handleDelete = (index) => {
    const updatedVideos = [...videos];
    updatedVideos.splice(index, 1);
    setVideos(updatedVideos);
    localStorage.setItem(`${username}-videos`, JSON.stringify(updatedVideos));
  };

  // when clicked on edit
  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditForm({
      title: videos[index].title,
      thumbnail: videos[index].thumbnail,
      videoUrl: videos[index].videoUrl
    });
  };

  // when data is edited
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  // when data is edited and saved
  const handleEditSave = () => {
    const updatedVideos = [...videos];
    updatedVideos[editingIndex] = {
      ...updatedVideos[editingIndex],
      title: editForm.title,
      thumbnail: editForm.thumbnail,
      videoUrl: editForm.videoUrl
    };
    setVideos(updatedVideos);
    localStorage.setItem(`${username}-videos`, JSON.stringify(updatedVideos));
    setEditingIndex(null);
  };

  // when nothing is edited and clicked cancel
  const handleEditCancel = () => {
    setEditingIndex(null);
  };

  // uploading new video
  const handleUploadInputChange = (e) => {
    const { name, value } = e.target;
    setNewVideo({ ...newVideo, [name]: value });
  };

  // save new uploaded video
  const handleUploadSave = () => {
    const updated = [...videos, newVideo];
    setVideos(updated);
    localStorage.setItem(`${username}-videos`, JSON.stringify(updated));
    setShowUploadForm(false);
    setNewVideo({ title: '', thumbnail: '', videoUrl: '', views: '', uploaded: '' });
  };

  //universe 2 
  return !localStorage.getItem("channelCreated") ? (
    <div className="channel-page">
      {/* when name of channel not found */}
      <h2>No Channel Found</h2>
      <p>Please create a channel from your profile to get started.</p>
    </div>
  ) : (
    // our own channel page
    <div className="channel-page">
      <img
        src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2023/02/one-piece.jpg"
        alt="Channel Banner"
        className="channel-banner"
      />

{/* channel header - profile picture, title, icon, description */}
      <div className="channel-header">
        <div className="channel-avatar-large">
          {username.charAt(0).toUpperCase()}
        </div>
        <div className="channel-info">
          <p className="channel-description">
            Heyyy!!! This channel belongs to an anime enthusiast who is on the road to be a Web Developer. She is someone who loves listening to BTS and finds peace in nature. Hope this channel makes you happy and brings calm to your chaos. 💜
          </p>
        </div>
      </div>

{/* upload video button */}
      <button className="upload-btn" onClick={() => setShowUploadForm(true)}>➕ Upload Video</button>

      {showUploadForm && (
        // edit form container
        <div className="edit-form-wrapper">
          <div className="edit-form-container">
            <h3>Upload Video</h3>
            <input
              type="text"
              name="title"
              value={newVideo.title}
              onChange={handleUploadInputChange}
              placeholder="Video Title"
            />
            <input
              type="text"
              name="thumbnail"
              value={newVideo.thumbnail}
              onChange={handleUploadInputChange}
              placeholder="Thumbnail URL"
            />
            <input
              type="text"
              name="videoUrl"
              value={newVideo.videoUrl}
              onChange={handleUploadInputChange}
              placeholder="Video URL"
            />
            <input
              type="text"
              name="views"
              value={newVideo.views}
              onChange={handleUploadInputChange}
              placeholder="Views (e.g. 1.2K)"
            />
            <input
              type="text"
              name="uploaded"
              value={newVideo.uploaded}
              onChange={handleUploadInputChange}
              placeholder="Uploaded (e.g. 1 day ago)"
            />
            <div className="edit-form-buttons">
              <button onClick={handleUploadSave}>Save</button>
              <button onClick={() => setShowUploadForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

{/* channel videos */}
      <div className="channel-videos">
        {videos.length === 0 ? (
          // if no video there
          <p>No videos uploaded yet.</p>
        ) : (
          videos.map((video, idx) => (
            <div key={idx} className="channel-video-card">
              {visiblePlayers[idx] ? (
                <video width="100%" height="200" controls>
                  <source src={video.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag. 
                </video>
              ) : (
                // structure of upload 
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  onClick={() => handleThumbnailClick(idx)}
                  style={{ cursor: "pointer" }}
                />
              )}
              <h4>{video.title}</h4>
              <p className="video-meta">{video.views} views • {video.uploaded}</p>
              <div className="video-actions">
                <button onClick={() => handleEdit(idx)}>Edit</button>
                <button onClick={() => handleDelete(idx)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>

{/* editing option fucntioning */}
      {editingIndex !== null && (
        <div className="edit-form-wrapper">
          <div className="edit-form-container">
            <h3>Edit Video</h3>

{/* edit form - title */}
            <label htmlFor="edit-title">Title</label>
            <input
              id="edit-title"
              type="text"
              name="title"
              value={editForm.title}
              onChange={handleEditChange}
              placeholder="Enter video title"
            />
{/* edit form - thumbnail URL*/}

            <label htmlFor="edit-thumbnail">Thumbnail URL</label>
            <input
              id="edit-thumbnail"
              type="text"
              name="thumbnail"
              value={editForm.thumbnail}
              onChange={handleEditChange}
              placeholder="Enter thumbnail image URL"
            />

{/* edit form - video URL */}
            <label htmlFor="edit-videoUrl">Video URL</label>
            <input
              id="edit-videoUrl"
              type="text"
              name="videoUrl"
              value={editForm.videoUrl}
              onChange={handleEditChange}
              placeholder="Enter video URL"
            />

{/* edit form - buttons - save/ cancel */}
            <div className="edit-form-buttons">
              <button onClick={handleEditSave}>Save</button>
              <button onClick={handleEditCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Channel;
