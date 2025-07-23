//imporitng react library from react 
import React from 'react';
//importing useNaviagte hook from react router dom
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  // universe 1 
  const navigate = useNavigate();

  // universe 2
  return (
  // not found page - telling user that they have reached an unexpected end point while searching for a vidoe thta yet doesnt exist, and helping them re route to a safe page
    <div className="nf-container">
      <h1>404</h1>
      <p>Oops! Sorry, the video you're looking for doesn't exist.</p>
      <p>Please go back to the homepage to find other vidoes or you can add your preferred video on Your Channel Page. ❤️</p>
      <button className="home-btn" onClick={() => navigate('/')}>
        Go back to Home
      </button>
    </div>
  );
}

export default NotFound;
