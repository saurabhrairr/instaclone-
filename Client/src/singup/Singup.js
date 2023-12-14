// Signup.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,useLocation  } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Singup.css'; // Custom styles
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap styles


const Signup = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();

  const handleSignup = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email',
        text: 'Please enter a valid email address.',
      });
      return;
    }
  
    try {
      // Check if the user is already registered
      const checkUserResponse = await axios.post('http://localhost:3082/checkUser', { email });
  
      if (checkUserResponse.data.isUserRegistered) {
        // User is already registered
        Swal.fire({
          icon: 'warning',
          title: 'Already Registered',
          text: 'This email address is already registered. Please log in.',
        });
        navigate('/'); // You might want to navigate to the login page here
        return;
      }
  
      // Make a request to your signup endpoint
      const signupResponse = await axios.post('http://localhost:3082/signup', {
        email,
        password,
      });
  
      // Show SweetAlert success message
      Swal.fire({
        icon: 'success',
        title: 'Signup Successful!',
        text: 'You have successfully signed up. Please log in.',
      });
  
      // Navigate to the login page after successful signup
      navigate('/');
    } catch (error) {
      console.error('Signup failed', error.response?.data?.error || 'Internal Server Error');
  
      // Show SweetAlert error message
      Swal.fire({
        icon: 'error',
        title: 'Signup Failed',
        text: error.response?.data?.error || 'Internal Server Error',
      });
    }
  };
  

  const isSignupPage = location.pathname === '/signup';

  return (
    <div
      className={`container1 d-flex justify-content-center align-items-center vh-100 ${isSignupPage ? 'signup-page' : ''}`}
    >
      <div className="form">
        <h2 className="mb-4">Signup</h2>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            email:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
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
        <button className="btn btn-primary" onClick={handleSignup}>
          Signup
        </button>
      </div>
    </div>
  );
};

export default Signup;
