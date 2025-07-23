//imporitng react libarary from react 
import React, { useState } from 'react';
import FilterBar from '../components/FilterBar';
import videos from "../data/videosData";
import VideoCard from '../components/VideoCard';
import './Home.css';

function Home() {
    //universe 1
    const [selectedFilter, setSelectedFilter] = useState("All");

    const filteredVideos =
      selectedFilter === "All"
        ? videos
        : videos.filter((video) => video.tags.includes(selectedFilter));

    //universe 2 
    return (
      <div className="home-page">
        {/* filter bar section */}
        <FilterBar selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />
        {/* <h2>Featured Videos</h2> */}
        {/* videos section */}
        <div className="videos-grid">
          {filteredVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    );
}

export default Home;
