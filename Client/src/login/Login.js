// Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../singup/Singup.css'; // Custom styles
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap styles


const Login = ({ setToken }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3082/login', {
        username,
        password,
      });

      const { token } = response.data;

      setToken(token);
      localStorage.setItem('jwtToken', token);
      console.log("TOKEN: " + token);
   

      // Show SweetAlert success message
      Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        text: 'You have successfully logged in.',
      });

      // Navigate to the landing page
      navigate('/Landingpage', );
    } catch (error) {
      console.error('Login failed', error.response?.data?.error || 'Internal Server Error');
      
      // Show SweetAlert error message
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.response?.data?.error || 'Internal Server Error',
      });
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="form">
        <h2 className="mb-4">Login</h2>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username:
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={handleLogin}>
          Login
        </button>
        <p className="mt-3">
          Don't have an account? <button className="btn btn-link" onClick={() => navigate('/signup')}>Signup</button>
        </p>
      </div>
    </div>
  );
};

export default Login;
