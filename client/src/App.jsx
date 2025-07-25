//importing useState, useEffect hook from react 
import { useState, useEffect } from 'react';
// importing all the components 
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// importing all the pages
import Home from './pages/Home';
import Login from './pages/Login';
import Channel from './pages/Channel';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import VideoDetails from './pages/VideoDetails';
import CreateChannel from './pages/CreateChannel';
import SearchResults from './components/SearchResults';
import UploadVideo from './pages/UploadVideo';
// import EditVideo from './pages/EditVideo';
import './App.css';

function App() {
  //universe 1
  // state for sidebar opening
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // state for login 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // state for user initial to use as icon later
  const [userInitial, setUserInitial] = useState('');

  useEffect(() => {
    // getting username from localstorage to use initial as icon after successfully logging in
    const username = localStorage.getItem("username");
    if (username) {
      setIsLoggedIn(true);
      setUserInitial(username.charAt(0).toUpperCase());
    }
  }, []);

  // toggling sidebar open <-> close
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  //universe 2 
  return (
    <Router>
      {/* Top Header with login status and initial */}
      <Header 
        onMenuClick={toggleSidebar} 
        isLoggedIn={isLoggedIn} 
        userInitial={userInitial} 
      />

      {/* displaying main container with sidebar if opened */}
      <div className="main-container">
        {/* Sidebar toggled by hamburger menu */}
        <div className={`sidebar-container ${sidebarOpen ? 'open' : ''}`}>
          <Sidebar show={sidebarOpen} isLoggedIn={isLoggedIn} />
        </div>

        {/* Main Content Area */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/login" 
              element={<Login setIsLoggedIn={setIsLoggedIn} setUserInitial={setUserInitial} />} 
            />
            <Route path="/channel" element={<Channel />} />
            <Route path="/register" element={<Register />} />
            <Route path="/videos/:id" element={<VideoDetails />} />
            <Route path="/create-channel" element={<CreateChannel />} />
            <Route path="/search/:query" element={<SearchResults />} />
            <Route path="/upload-video" element={<UploadVideo />} />            
            {/* <Route path="/edit/:id" element={<EditVideo />} /> */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
