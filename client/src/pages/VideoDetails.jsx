
// imporitng react libarry , useState, useEffect 
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NotFound from './NotFound';
import './VideoDetails.css';
//Importing axios library to make API requests
import axios from 'axios';

function VideoDetails() {
  // universe 1 
  const { id } = useParams();

  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  // static comments on every video
  const [comments, setComments] = useState([
    { id: 'static-1', author: 'Nami', text: 'Love this video! ❤️', static: true },
    { id: 'static-2', author: 'Ussopp', text: 'Wow amazing!', static: true }
  ]);
  const [newComment, setNewComment] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState('');
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  // function to fetch comments - static and dynamic by:id
  const fetchComments = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/comments/${id}`);
      const dynamicComments = res.data.map(c => ({
        id: c._id,
        author: c.username,
        text: c.text,
        static: false
      }));
      setComments([
        { id: 'static-1', author: 'Nami', text: 'Love this video! ❤️', static: true },
        { id: 'static-2', author: 'Ussopp', text: 'Wow amazing!', static: true },
        ...dynamicComments
      ]);
    } catch (err) {
      console.error('Error fetching comments', err); // in case of any error 
    }
  };

  // function to fetch data of vidoes 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [videoRes, videosRes] = await Promise.all([
          axios.get(`http://localhost:8080/api/videos/${id}`),
          axios.get(`http://localhost:8080/api/videos`)
        ]);

        setVideo(videoRes.data);
        setLikes(videoRes.data.likes);
        setDislikes(videoRes.data.dislikes);
        setVideos(videosRes.data);

        await fetchComments(); // fetch fresh comments
      } catch (err) {
        console.error('Error fetching data', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!video) return <NotFound />;

  // adding new comment
  const handleAddComment = async () => {
    if (newComment.trim() === '') return;
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username') || 'You';

    try {
      await axios.post(
        `http://localhost:8080/api/comments/${id}`,
        { text: newComment, username },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setNewComment('');
      fetchComments(); // re-fetch all after adding
    } catch (err) {
      console.error('❌ Failed to post comment:', err);
      alert('Please log in to comment');
    }
  };

  // editing comment
  const handleEditComment = (id) => {
    const commentToEdit = comments.find(c => c.id === id);
    setEditedText(commentToEdit.text);
    setEditingId(id);
    setMenuOpenId(null);
  };

  // saving edited part of comment
  const handleSaveEdit = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(
        `http://localhost:8080/api/comments/${editingId}`,
        { text: editedText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchComments();
      setEditingId(null);
      setEditedText('');
    } catch (err) {
      alert('Login to edit comment.');
    }
  };

  // deleteing comment
  const handleDeleteComment = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:8080/api/comments/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      fetchComments();
      setMenuOpenId(null);
    } catch (err) {
      alert('Login to delete comment.');
    }
  };

  // function for like 
  const handleLike = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `http://localhost:8080/api/videos/like/${video._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLikes(res.data.likes);
      setDislikes(res.data.dislikes);
      setLiked(true);
      setDisliked(false);
    } catch (err) {
      alert('Login to like this video.');
    }
  };

    // function for dislike 
  const handleDislike = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `http://localhost:8080/api/videos/dislike/${video._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLikes(res.data.likes);
      setDislikes(res.data.dislikes);
      setDisliked(true);
      setLiked(false);
    } catch (err) {
      alert('Login to dislike this video.');
    }
  };

  // related/other vidoes to show on the side
  const relatedVideos = videos.filter(v => v._id !== video._id);

  // universe 2
  return (
    // main video section - vide, title, description, like, dislike options, comments
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
          <p>This video is a peek into my passion towards my career and hobbies. I hope you enjoy it to the fullest and find joy and peace in my videos! And if you do, please don't forget to like, share and subscribe!! 🌸</p>
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
                <p className="comment-header"><strong>{comment.author}</strong></p>
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

              {!comment.static && (
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
              )}
            </div>
          ))}
        </div>
      </div>

{/*  videos on the side */}
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
