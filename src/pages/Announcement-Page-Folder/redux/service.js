// Code inpsired from Workshop 3's cs455-express-demo repo: https://github.com/svmah/cs455-express-demo/tree/add-server
import { auth } from '../../../firebase';

const getAnnouncements = async (uid, course) => {
  const idToken = await auth.currentUser.getIdToken();
  const response = await fetch(
    `http://localhost:3005/announcements/${course}/${uid}`,
    {
      method: 'GET',
      headers: {
        Authorization: `${idToken}`,
      },
    }
  );
  const data = await response.json();
  if (!response.ok) {
    const errorMsg = data?.message;
    throw new Error(errorMsg);
  }

  return data;
};

const addAnnouncement = async (uid, card) => {
  const idToken = await auth.currentUser.getIdToken();
  const response = await fetch(`http://localhost:3005/announcements/${uid}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${idToken}`,
    },
    body: JSON.stringify(card),
  });

  const data = await response.json();
  if (!response.ok) {
    const errorMsg = data?.message;
    throw new Error(errorMsg);
  }

  return data;
};

const removeAnnouncement = async (uid, id) => {
  const idToken = await auth.currentUser.getIdToken();
  await fetch(`http://localhost:3005/announcements/${uid}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${idToken}`,
    },
  });

  return id;
};

export default {
  getAnnouncements,
  addAnnouncement,
  removeAnnouncement,
};
