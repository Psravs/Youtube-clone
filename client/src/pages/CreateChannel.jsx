import React, { useState } from 'react';
import './CreateChannel.css';
import { useNavigate } from 'react-router-dom';

function CreateChannel() {
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("channelCreated", true);
    localStorage.setItem("channelName", name);
    localStorage.setItem("channelHandle", handle);
    localStorage.setItem("channelInitial", name[0].toUpperCase());

    alert("Channel Created!");
    navigate('/channel');
  };

  return (
    <div className="create-channel-container">
      <h2>How you'll appear</h2>
      <form className="create-form" onSubmit={handleSubmit}>
        {/* <div className="profile-pic-placeholder">
          <img
            src="https://www.svgrepo.com/show/382106/user-default.svg"
            alt="Default"
          />
          <p className="select-pic">Select picture</p>
        </div> */}

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
