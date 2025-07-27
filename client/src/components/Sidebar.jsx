//imporitng react library  
import React from 'react';
import './Sidebar.css';
//importing navigate hook
import { useNavigate } from 'react-router-dom';

function Sidebar({ show }) {

  //universe 1
  const navigate = useNavigate();

  //universe 2
  return (
    // when sidebar is opened by clicking on hamburger - show options 
    <aside className={`sidebar ${show ? 'open' : ''}`}>
      <ul className="sidebar-items">
        {/* navigating to home page */}
        <li  className='home' onClick={() => navigate('/')}>
          <span>🏠</span>
          <span>&nbsp; Home</span>
        </li>
        <li>
          <span>🔥</span>
          <span>&nbsp; Shorts</span>
        </li>
        <li>
          <span>🔔</span>
          <span>&nbsp; Subscriptions</span>
        </li>
        <hr />
        {/* navigating to your channel page */}
          <li className='channel' onClick={() => navigate('/channel')}>
          <span>👤</span>
          <span>&nbsp; Your Channel</span>
        </li>
        <li>
          <span>🕘</span>
          <span>&nbsp; History</span>
        </li>
        <li>
          <span>▶︎</span>
          <span>&nbsp; Playlists</span>
        </li>
        <li>
          <span>🎥</span>
          <span>&nbsp; Your Videos</span>
        </li>
        <li>
          <span>⏳</span>
          <span>&nbsp; Watch Later</span>
        </li>
        <li>
          <span>👍</span>
          <span>&nbsp; Liked Videos</span>
        </li>
        <li>
          <span>⚙️</span>
          <span>&nbsp; Settings</span>
        </li>
        <li>
          <span>🚩</span>
          <span>&nbsp; Report</span>
        </li>
        <li>
          <span>？</span>
          <span>&nbsp; Help</span>
        </li>
        
      </ul>
    </aside>
  );
}

export default Sidebar;
