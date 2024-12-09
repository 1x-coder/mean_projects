// src/components/EventList.js
import React, { useEffect, useState } from 'react';
import axios from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { Card, Button } from 'react-bootstrap';
import styled from 'styled-components';

const EventContainer = styled.div`
  display: flex;
  flex-direction: column;  /* Updated to column */
  align-items: left;      /* Center align items horizontally */
  margin-top: 20px;         /* Added margin-top for spacing */
`;

const EventCard = styled(Card)`
  width: 18rem;
  margin-bottom: 20px;
`;

const EventList = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Failed to fetch events:', error.message);
      }
    };

    fetchEvents();
  }, []);

  const joinEvent = async (eventId) => {
    try {
      const response = await axios.post(`/events/join/${eventId}`, {
        userId: user.userId,
      });

      if (response && response.data) {
        console.log(response.data.message);
        // You can update your component state or perform additional actions here
      } else {
        console.error('Joining event failed. No data received from the server.');
      }
    } catch (error) {
      console.error('Joining event failed:', error.message);

      if (error.response && error.response.status === 400 && error.response.data.message === 'User is already attending this event') {
        console.log('User is already attending this event');
        // Handle the case where the user is already an attendee
      } else {
        console.error('Other specific error:', error.message);
        // Handle other specific error cases here
      }
    }
  };

  return (
    <EventContainer>
      <h2>Event List</h2>
      {events.map((event) => (
        <EventCard key={event._id}>
          <Card.Body>
            <Card.Title>{event.title}</Card.Title>
            <Card.Text>{event.description}</Card.Text>
            <Button variant="success" onClick={() => joinEvent(event._id)}>
              Join Event
            </Button>
          </Card.Body>
        </EventCard>
      ))}
    </EventContainer>
  );
};

export default EventList;
