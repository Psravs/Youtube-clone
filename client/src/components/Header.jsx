// importing react library and useState, useEffect hooks from react
import React, { useState, useEffect } from 'react';
import './Header.css';

// importing menu(hamburger), serach , mic icons
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MicIcon from '@mui/icons-material/Mic';

// importing useNavigate hook from react router dom
import { useNavigate } from 'react-router-dom';

function Header({ onMenuClick, isLoggedIn, userInitial }) {
  //universe 1 
  const navigate = useNavigate();

  //using state for showing dropdown menu 
  const [dropdownVisible, setDropdownVisible] = useState(false);
  // using state to check if channel is created
  const [channelCreated, setChannelCreated] = useState(false);
  //using state to store search input
  const [searchTerm, setSearchTerm] = useState('');

  //checking if channel is already there in localStorage
  useEffect(() => {
    const isCreated = localStorage.getItem("channelCreated") === "true";
    setChannelCreated(isCreated);
  }, []);

  //handling search
  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm}`);
      setSearchTerm('');
    }
  };

  //handling enter key press
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  //navigating to login
  const handleSignIn = () => {
    navigate('/login');
  };

  //navigating to channel or create channel

  const handleChannelClick = () => {
    setDropdownVisible(false);
    navigate('/channel');
  };

  const handleCreateChannelClick = () => {
    setDropdownVisible(false);
    navigate('/create-channel');
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  // log out option 
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('channelCreated');
    setDropdownVisible(false);
    navigate('/login');
    window.location.reload();
  };

  //universe 2 
  return (
    <header className="header">
      <div className="left">
              {/* hamburger option */}
        <MenuIcon className="menu-icon" onClick={onMenuClick} />
        {/* Youtube logo */}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
          alt="YouTube"
          className="yt-logo"
          onClick={() => navigate('/')}
        />
      </div>

{/* search option */}
      <div className="center">
        <input
          type="text"
          placeholder="Search"
          className="search-input"
          name="search"
          id="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <SearchIcon className="search-icon" onClick={handleSearch} />
        <MicIcon className="mic-icon" />
      </div>

{/* create channel + Sign in */}
      <div className="right">
        {isLoggedIn ? (
          <>
            {/* Create Your Channel */}
            {/* if not craeted, then create channel option shown on header next user intial icon after signing in */}
            {!channelCreated ? (
              <button className="create-btn" onClick={handleCreateChannelClick}>
                Create Channel
              </button>
            ) : (
              // if already channel craeted then show Your channel option instead
              <button className="create-btn" onClick={handleChannelClick}>
                Your Channel
              </button>
            )}

            {/* Initial icon and dropdown */}
            <div className="user-dropdown">
              <div className="user-initial" onClick={toggleDropdown}>
                {userInitial}
              </div>

              {/* dropdown */}
              {dropdownVisible && (
                <div className="dropdown-menu">
                  {!channelCreated ? (
                    //if channel not craeted, then craete 
                    <div onClick={handleCreateChannelClick}>Create Channel</div>
                  ) : (
                    // if channel already craeted then dropdown add
                    <div onClick={handleChannelClick}>Your Channel</div>
                  )}
                  <div onClick={handleLogout}>Logout</div>
                </div>
              )}
            </div>
          </>
        ) : (
          // sign in button if not already did
          <button className="sign-in-btn" onClick={handleSignIn}>Sign In</button>
        )}
      </div>
    </header>
  );
}

export default Header;
