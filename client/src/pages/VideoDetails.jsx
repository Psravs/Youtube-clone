//imporitng react libarry, useState hook from react
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // useParams hook
import NotFound from './NotFound'; // fallback page
import './VideoDetails.css';
import axios from 'axios';

function VideoDetails() {
  const { id } = useParams();

  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]); // all videos
  const [comments, setComments] = useState([
    { id: 1, author: 'Nami', text: 'Love this video! ❤️' },
    { id: 2, author: 'Ussopp', text: 'Wow amazing!' }
  ]);
  const [newComment, setNewComment] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState('');
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/videos/${id}`);
        setVideo(res.data);
        setLikes(res.data.likes);
        setDislikes(res.data.dislikes);
      } catch (err) {
        console.error('Error fetching video details', err);
      } finally {
        setLoading(false);
      }
    };

    const fetchAllVideos = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/videos`);
        setVideos(res.data);
      } catch (err) {
        console.error("Failed to fetch videos list", err);
      }
    };

    fetchVideo();
    fetchAllVideos();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!video) return <NotFound />;

  const handleAddComment = () => {
    if (newComment.trim() === '') return;
    const newEntry = {
      id: Date.now(),
      author: 'You',
      text: newComment
    };
    setComments([newEntry, ...comments]);
    setNewComment('');
  };

  const handleEditComment = (id) => {
    const commentToEdit = comments.find(c => c.id === id);
    setEditedText(commentToEdit.text);
    setEditingId(id);
    setMenuOpenId(null);
  };

  const handleSaveEdit = () => {
    setComments(comments.map(c => c.id === editingId ? { ...c, text: editedText } : c));
    setEditingId(null);
    setEditedText('');
  };

  const handleDeleteComment = (id) => {
    setComments(comments.filter(c => c.id !== id));
    setMenuOpenId(null);
  };

  const handleLike = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log(token);
      const res = await axios.post(
        `http://localhost:8080/api/videos/like/${video._id}`,
        {},
        {
          headers: { 
            Authorization: `Bearer ${token}` 
          }
        }
      );
      setLikes(res.data.likes);
      setDislikes(res.data.dislikes);
      setLiked(true);
      setDisliked(false);
    } catch (err) {
      alert('Login to like this video.');
    }
  };

  const handleDislike = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log(token);
      const res = await axios.post(
        `http://localhost:8080/api/videos/dislike/${video._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setLikes(res.data.likes);
      setDislikes(res.data.dislikes);
      setDisliked(true);
      setLiked(false);
    } catch (err) {
      alert('Login to dislike this video.');
    }
  };

  const relatedVideos = videos.filter(v => v._id !== video._id).slice(0, 5);

  return (
    <div className="video-details-page">
      <div className="main-video-section">
        <video controls className="main-video" poster={video.thumbnail}>
          <source src={video.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <h2 className="video-title">{video.title}</h2>

        <div className="channel-meta-row">
          <div className="video-meta">
            <div className="channel-avatar-icon">
              {video.channel.charAt(0).toUpperCase()}
            </div>
            <span className="channel-name">{video.channel}</span>
          </div>

          <div className="channel-actions">
            <button className={`like-btn ${liked ? 'active' : ''}`} onClick={handleLike}>
              👍 {likes}
            </button>
            <button className={`dislike-btn ${disliked ? 'active' : ''}`} onClick={handleDislike}>
              👎 {dislikes}
            </button>
            <button className="subscribe-btn">Subscribe</button>
          </div>
        </div>

        <div className="description">
          <p className="video-stats">{video.views} • {video.time}</p>
          <p>This video is a peek into my passion towards my career and hobbies. I hope you enjoy it to the fullest and find peace in my videos! And if you do, please don't forget to like, share and subscribe!! 🌸</p>
        </div>

        <div className="comments-section">
          <h3>{comments.length} Comments</h3>

          <div className="add-comment">
            <div className="channel-avatar-icon">Y</div>
            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              className="comment-input"
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
            />
          </div>

          {comments.map(comment => (
            <div key={comment.id} className="comment">
              <div className="channel-avatar-icon">
                {comment.author.charAt(0).toUpperCase()}
              </div>
              <div className="comment-content">
                <p className="comment-header">
                  <strong>{comment.author}</strong>
                </p>
                {editingId === comment.id ? (
                  <>
                    <input
                      className="comment-input"
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                    />
                    <div className="comment-buttons">
                      <button onClick={handleSaveEdit}>Save</button>
                      <button onClick={() => setEditingId(null)}>Cancel</button>
                    </div>
                  </>
                ) : (
                  <p className="comment-text">{comment.text}</p>
                )}
              </div>
              <div
                className="dots"
                onClick={() =>
                  setMenuOpenId(menuOpenId === comment.id ? null : comment.id)
                }
              >
                ⋮
                {menuOpenId === comment.id && (
                  <div className="comment-menu">
                    <div onClick={() => handleEditComment(comment.id)}>Edit</div>
                    <div onClick={() => handleDeleteComment(comment.id)}>Delete</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* side videos */}
      <div className="side-videos">
        <h4>More Videos</h4>
        {relatedVideos.length > 0 ? (
          relatedVideos.map((v) => (
            <div key={v._id} className="side-video">
              <img src={v.thumbnail} alt="thumb" />
              <div>
                <p>{v.title}</p>
                <small>{v.channel}</small>
              </div>
            </div>
          ))
        ) : (
          <p>No related videos found.</p>
        )}
      </div>
    </div>
  );
}

export default VideoDetails;
