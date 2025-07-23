//importing react library, useState hook fromr ecat 
import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
//imporitng useNaviagte hook from react router dom
import { useNavigate } from 'react-router-dom';

function Login({ setIsLoggedIn, setUserInitial }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    //unibverse 1
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/auth/login', {
        email,
        password
      });

      // if no token received
      if (!res.data.token) {
        alert('Login failed: Token missing');
        return;
      }

      const { token, username } = res.data;

      localStorage.setItem('token', token); // ✅ store JWT token
      localStorage.setItem('username', username); // ✅ store username
      setIsLoggedIn(true); // ✅ update app state
      setUserInitial(username[0].toUpperCase()); // ✅ show initial icon
      navigate('/'); // ✅ redirect to home page
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed'); // more useful error
    }
  };

  //universe 2 
  return (
    // login page
    <div className="login-page">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Sign In</h2>

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

        <button type="submit">Login</button>

{/* when user doesnt have an accoutn , they need to first register, so navigate to register page */}
        <p>
          Don't have an account?{' '}
          <span onClick={() => navigate('/register')}>
            Register
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
