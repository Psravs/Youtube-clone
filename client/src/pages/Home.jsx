//imporitng react libarary from react 
import React, { useState, useEffect } from 'react';
import FilterBar from '../components/FilterBar';
// import videos from "../data/videosData"; // not using dummy data anymore
import VideoCard from '../components/VideoCard';
import './Home.css';
import axios from 'axios';

function Home() {
    //universe 1
    const [selectedFilter, setSelectedFilter] = useState("All");
    const [videos, setVideos] = useState([]);

    useEffect(() => {
      const fetchVideos = async () => {
        try {
          const res = await axios.get('http://localhost:8080/api/videos');
          setVideos(res.data);
        } catch (err) {
          console.error("Error fetching videos", err);
        }
      };
      fetchVideos();
    }, []);

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
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      </div>
    );
}

export default Home;
