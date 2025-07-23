//importing react, useState hook from react
import React, { useState } from 'react';
import axios from 'axios';
// uses same styling as login page
import './Login.css';
//importing useNavigate hook from react-router-dom
import { useNavigate } from 'react-router-dom';

function Register() {
  //universe1
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault(); //prevents from laoding until dependencies are loaded
    try {
      // waits until user rgeistered succesffully
      await axios.post('http://localhost:8080/api/auth/register', {
        username,
        email,
        password
      });
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (error) {
      // handle errors
      const msg = error.response?.data?.error || 'Unknown error';
      alert('Registration failed: ' + msg);
    }
  };

  //universe2
  return (
    // log in page
    <div className="login-page">
      {/* if user doesnt already ahve an accoutn-> regitser page */}
      <form onSubmit={handleRegister} className="login-form">
        <h2>Create Account</h2>

        <input
          type="text"
          placeholder="Username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

{/* register button */}
        <button type="submit">Register</button>
      </form>

      <p style={{ textAlign: 'center' }}>
        Already have an account?{' '}
        {/* if user already has ana ccount navigate to log in page */}
        <span
          onClick={() => navigate('/login')}
          style={{ color: '#c44569', cursor: 'pointer' }}
        >
          Login
        </span>
      </p>
    </div>
  );
}

export default Register;
