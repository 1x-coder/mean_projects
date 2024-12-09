// src/components/Auth/Register.js
import React, { useState } from 'react';
import axios from '../../services/api';
import './Login.css'
import styled from 'styled-components';

const RegContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr minmax(200px, 400px) 1fr;
  grid-template-rows: 1fr minmax(auto, 1fr) 1fr;
  height: 100vh;
`;

const RegForm = styled.form`
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
    font-family: 'Jura';
    margin-bottom: 5px;
    text-align: center;
    text-shadow: 0 4px 16px #fff;
    font-size: 30px;
    font-weight: 100;
  }

  label {
    font-family: 'Jura';
    text-align: left;
    padding-bottom: 2px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;

    span {
      padding-right: 0px;
    }
  }

  input {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    &:hover {
      border: 1px solid #aaf;
    }
  }

  input[type="text"],
  input[type="password"],
  input[type="email"] {
    grid-column: 2;
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

const Register = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post('/auth/register', userData);

      if (response && response.data) {
        console.log('User registered successfully:', response.data);
      } else {
        console.error('Registration failed. No data received from the server.');
      }
    } catch (error) {
      console.error('Registration failed:', error.message);
      // also handle specific error cases here
    }
  };

  return (
    <RegContainer>
      <RegForm>
        <h2>Register</h2>
        <label>
          <span>Email:</span>
          <input type="email" name="email" onChange={handleInputChange} />
        </label>
        <label>
          <span>Username:</span>
          <input type="text" name="username" onChange={handleInputChange} />
        </label>
        <label>
          <span>Password:</span>
          <input type="password" name="password" onChange={handleInputChange} />
        </label>
        <button type="button" onClick={handleRegister}>
          Sign Up
        </button>
      </RegForm>
    </RegContainer>
  );
};

export default Register;
