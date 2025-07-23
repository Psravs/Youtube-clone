//imporitng react libarry, useState hook from react
import React, { useState, useEffect } from 'react';
// imporitng useParams hook from react router dom
import { useParams } from 'react-router-dom';
// imporitng NotFound page
import NotFound from './NotFound';
import './VideoDetails.css';
import axios from 'axios';

function VideoDetails() {
  // universe 1
  const { id } = useParams();

  // local state for storing video from backend
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  // default comments
  const [comments, setComments] = useState([
    { id: 1, author: 'Nami', text: 'Love this video! ❤️' },
    { id: 2, author: 'Ussopp', text: 'Wow amazing!' }
  ]);

  // state for adding new comments
  const [newComment, setNewComment] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState('');
  const [menuOpenId, setMenuOpenId] = useState(null);

  // like/dislike states
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  // fetch video data from backend
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
    fetchVideo();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!video) return <NotFound />;

  // adding new comment
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

  // edit comment
  const handleEditComment = (id) => {
    const commentToEdit = comments.find(c => c.id === id);
    setEditedText(commentToEdit.text);
    setEditingId(id);
    setMenuOpenId(null);
  };

  // save edited comment
  const handleSaveEdit = () => {
    setComments(comments.map(c => c.id === editingId ? { ...c, text: editedText } : c));
    setEditingId(null);
    setEditedText('');
  };

  // deleting comment
  const handleDeleteComment = (id) => {
    setComments(comments.filter(c => c.id !== id));
    setMenuOpenId(null);
  };

  // handle like button
  const handleLike = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`http://localhost:8080/api/videos/like/${video._id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLikes(res.data.likes);
      setDislikes(res.data.dislikes);
      setLiked(true);
      setDisliked(false);
    } catch (err) {
      alert('Login to like this video.');
    }
  };

  // handle dislike button
  const handleDislike = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`http://localhost:8080/api/videos/dislike/${video._id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLikes(res.data.likes);
      setDislikes(res.data.dislikes);
      setDisliked(true);
      setLiked(false);
    } catch (err) {
      alert('Login to dislike this video.');
    }
  };

  // universe 2 
  return (
    // vidoe palyer page
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

{/* comments section */}
        <div className="comments-section">
          <h3>{comments.length} Comments</h3>

{/* adding new comment */}
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

{/* existing commnets */}
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
                      {/* saving comment */}
                      <button onClick={handleSaveEdit}>Save</button>
                      <button onClick={() => setEditingId(null)}>Cancel</button>
                    </div>
                  </>
                ) : (
                  <p className="comment-text">{comment.text}</p>
                )}
              </div>
              {/* dots fro edit and delete options */}
              <div
                className="dots"
                onClick={() =>
                  setMenuOpenId(menuOpenId === comment.id ? null : comment.id)
                }
              >
                ⋮
                {menuOpenId === comment.id && (
                  // editing comment option
                  <div className="comment-menu">
                    <div onClick={() => handleEditComment(comment.id)}>Edit</div>
                    {/* deleting comment option */}
                    <div onClick={() => handleDeleteComment(comment.id)}>Delete</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* videos on the side section on video palyer page */}

      <div className="side-videos">
        <h4>More Videos</h4>
        {/* dummy fallback */}
        {video && video.tags && video.tags.length > 0 ? (
          video.tags.map((tag, index) => (
            <div key={index} className="side-video">
              <img src={video.thumbnail} alt="thumb" />
              <div>
                <p>{video.title}</p>
                <small>{video.channel}</small>
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
