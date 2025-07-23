//importing react , useState hook from react 
import React, { useState } from 'react';
import './CreateChannel.css';
//importing useNavigate from react-router-dom
import { useNavigate } from 'react-router-dom';

function CreateChannel() {
  // universe 1
  const [channelName, setChannelName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const navigate = useNavigate();

  const handleCreate = () => {
    if (!channelName.trim()) {
      alert("Please enter a channel name.");
      return;
    }

    localStorage.setItem("channelCreated", "true");
    localStorage.setItem("channelName", channelName);
    if (profileImage) {
      localStorage.setItem("channelPic", profileImage);
    }

    alert("Channel created successfully!");
    navigate("/channel");
  };

  // unievrse 2

  return (
    // create channel card
    <div className="create-channel-page">
      <form className="create-channel-card" onSubmit={(e) => { e.preventDefault(); handleCreate(); }}>
        <h2>Create Your Channel</h2>

{/* channel anme */}
        <input 
          type="text" 
          placeholder="Channel Name" 
          required
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
        />

{/* profile pciture */}
        <input 
          type="text" 
          placeholder="Profile Picture URL (optional)" 
          value={profileImage}
          onChange={(e) => setProfileImage(e.target.value)}
        />

        <button type="submit">Create Channel</button>
      </form>
    </div>
  );
}

export default CreateChannel;
