//imporitng react libarry, useState hook from react
import React, { useState } from 'react';
// imporitng useParams hook from react router dom
import { useParams } from 'react-router-dom';
// imporitng videos data
import videos from '../data/videosData';
import NotFound from './NotFound';
import './VideoDetails.css';

function VideoDetails() {
  // universe 1
  const { id } = useParams();
  const video = videos.find((v) => v.id === parseInt(id));

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
  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
      setLiked(false);
    } else {
      setLikes(likes + 1);
      if (disliked) {
        setDislikes(dislikes - 1);
        setDisliked(false);
      }
      setLiked(true);
    }
  };

  // handle dislike button
  const handleDislike = () => {
    if (disliked) {
      setDislikes(dislikes - 1);
      setDisliked(false);
    } else {
      setDislikes(dislikes + 1);
      if (liked) {
        setLikes(likes - 1);
        setLiked(false);
      }
      setDisliked(true);
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
        {videos.slice(0, 5).map((vid) => (
          <div key={vid.id} className="side-video">
            <img src={vid.thumbnail} alt="thumb" />
            <div>
              <p>{vid.title}</p>
              <small>{vid.channel}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoDetails;
