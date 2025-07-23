//imporitng react library 
import React from 'react';
//imporitng useParams hook and link from react router dom 
import { useParams, Link } from 'react-router-dom';
import videos from '../data/videosData';
import NotFound from '../pages/NotFound';
import './SearchResults.css';

function SearchResults() {
    // universe 1 
  const { query } = useParams();
  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(query.toLowerCase())
  );

//   universe 2 
  return (
    //search results displayed 
    <div className="search-results-page">
      <h2>Search Results for "{query}"</h2>
      {filteredVideos.length === 0 ? (
      <NotFound />
      ) : (
        // serahc results listed by the keyword/title serahced 
        <div className="search-results-list">
          {filteredVideos.map(video => (
            <Link to={`/watch/${video.id}`} key={video.id} className="search-video">
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
