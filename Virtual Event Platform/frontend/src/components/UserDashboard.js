// src/components/UserDashboard.js
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import EventList from './Event/EventList';

const UserDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <div style={{ textAlign: 'right', padding: '10px' }}>
        Welcome, {user.username}! <button onClick={logout}>Logout</button>
      </div>
      <EventList />
    </div>
  );
};

export default UserDashboard;
