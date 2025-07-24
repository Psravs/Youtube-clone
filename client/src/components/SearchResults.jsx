import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import './SearchResults.css';
import axios from 'axios';

function SearchResults() {
  const { query } = useParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/videos');
        const filtered = res.data.filter(video =>
          video.title.toLowerCase().includes(query.toLowerCase())
        );
        setVideos(filtered);
      } catch (err) {
        console.error('Error fetching videos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [query]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="search-results-page">
      <h2>Search Results for "{query}"</h2>
      {videos.length === 0 ? (
        <NotFound />
      ) : (
        <div className="search-results-list">
          {videos.map(video => (
            <Link to={`/videos/${video._id}`} key={video._id} className="search-video">
              <img src={video.thumbnail} alt={video.title} className="video-thumb" />
              <div className="video-info">
                <h4>{video.title}</h4>
                <p>{video.channel}</p>
                <p>{video.views} • {video.time}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResults;
