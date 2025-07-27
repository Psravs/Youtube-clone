
// importing react library and useState hook 
import React, { useState } from 'react';
import './CreateChannel.css';
// imporitng useNavigate hook from react router dom 
import { useNavigate } from 'react-router-dom';

function CreateChannel() {
  // universe 1
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const navigate = useNavigate();

  // function for submitting channel creation form 
  const handleSubmit = (e) => {
    // prevents from auto submitting and reloading
    e.preventDefault();

    localStorage.setItem("channelCreated", true);
    localStorage.setItem("channelName", name);
    localStorage.setItem("channelHandle", handle);
    localStorage.setItem("channelInitial", name[0].toUpperCase());

    alert("Channel Created!"); //success msg
    navigate('/channel'); //naviagting to channel page 
  };

  // unievrse 2 
  return (
    // channel craetion form for user 
    <div className="create-channel-container">
      <h2>How you'll appear</h2>
      <form className="create-form" onSubmit={handleSubmit}>
        
        <input
          type="text"
          placeholder="Name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Handle"
          value={handle}
          required
          onChange={(e) => setHandle(e.target.value)}
        />

        <button type="submit">Create channel</button>
      </form>
    </div>
  );
}

export default CreateChannel;
