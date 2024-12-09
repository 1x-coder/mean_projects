import React, { useState } from 'react';
import axios from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
//import { Form, Button } from 'react-bootstrap'; 
//import './Login.css'; // Import the CSS file

const LoginContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr minmax(200px, 400px) 1fr;
  grid-template-rows: 1fr minmax(auto, 1fr) 1fr;
  height: 100vh;
`;

const LoginForm = styled.form`
  grid-column: 2;
  grid-row: 1;
  display: grid;
  grid-gap: 10px;
  margin: auto 0;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 32px 64px rgba(0, 0, 0, 0.2);

  h2 {
    font-family : 'Jura' ;
    margin-bottom: 5px;
    text-align: center;
    text-shadow: 0 4px 16px #fff;
    font-size: 30px;
    font-weight: 100;
  }

  label {
    font-family : 'Jura' ;
    text-align: left;
    padding-bottom: 2px;
  }

  input {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    &:hover {
      border: 1px solid #aaf;
    }
  }

  button {
    padding: 10px;
    border: 1px solid rgba(0, 0, 0, 0);
    border-radius: 5px;
    background: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    cursor: pointer;

    &:hover {
      background-color: #eef;
      border: 1px solid #aaf;
    }
  }
`;

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const { login } = useAuth();

  const navigate = useNavigate();


  const handleInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('/auth/login', loginData);
      console.log('Login successful:', response.data);
  
      // Call the login function from the AuthContext to update the user state
      login(response.data);
  
      // Redirect to the dashboard (update this route based on your setup)
      navigate('/dashboard');
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Login failed:', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up the request:', error.message);
      }
    }
  };
  

  return (
    <LoginContainer>
      <LoginForm>
        <h2>Login</h2>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" onChange={handleInputChange} />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" onChange={handleInputChange} />

        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </LoginForm>
    </LoginContainer>
  );
};


export default Login;
