// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import UserDashboard from './components/UserDashboard';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';

const AppContainer = styled.div`
  background: linear-gradient(-45deg, #EE7752, #E73C7E, #23A6D5, #23D5AB);
  padding: 20px;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  justify-content: center;
  align-items: center;

  h1 {
    font-family = 'Jura';
    text-align: center;
    color: #fff;
    text-shadow: 0 4px 16px #fff;
    font-size: 100px;
    font-weight: 500;
  }

  nav {
    ul {
      font-family : 'Jura' ;
      list-style: none;
      padding: 0;
      display: flex;
      justify-content: center;

      li {
        margin: 0 20px;

        a {
          color: #fff;
          text-decoration: none;
          font-size: 30px;
          font-weight: bold;
          text-shadow: 0 2px 8px #fff;

          &:hover {
            color: #aaf;
          }
        }
      }
    }
  }
`;

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContainer>
          <h1>Virtual Event Platform</h1>
          <nav>
            <ul>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/dashboard">User Dashboard</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={<PrivateRoute component={<UserDashboard />} />}
            />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </AppContainer>
      </Router>
    </AuthProvider>
  );
};

const PrivateRoute = ({ component }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated() ? component : <Navigate to="/login" />;
};

export default App;
