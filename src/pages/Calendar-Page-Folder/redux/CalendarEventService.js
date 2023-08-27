import { auth } from '../../../firebase';

export const getEvents = async (uid) => {
  try {
    const idToken = await auth.currentUser.getIdToken();
    const response = await fetch(`http://localhost:3005/events/${uid}`, {
      method: 'GET',
      headers: {
        Authorization: `${idToken}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to retrieve user info');
    }
    return response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addEvent = async (uid, event) => {
  try {
    const idToken = await auth.currentUser.getIdToken();
    const response = await fetch(`http://localhost:3005/events/${uid}`, {
      method: 'POST',
      body: JSON.stringify(event),
      headers: {
        Authorization: `${idToken}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to create event');
    }
    return response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const editEvent = async (uid, event) => {
  try {
    const idToken = await auth.currentUser.getIdToken();
    const response = await fetch(
      `http://localhost:3005/events/${uid}/${event._id}`,
      {
        method: 'PUT',
        body: JSON.stringify(event),
        headers: {
          Authorization: `${idToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteEvent = async (userId, eventId) => {
  try {
    const idToken = await auth.currentUser.getIdToken();
    const response = await fetch(
      `http://localhost:3005/events/${userId}/${eventId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `${idToken}`,
        },
      }
    );
  } catch (error) {
    throw new Error(error.message);
  }
};
