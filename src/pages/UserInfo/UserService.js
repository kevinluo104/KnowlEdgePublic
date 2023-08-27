import { auth } from '../../firebase';
export const getUser = async (uid) => {
  try {
    const response = await fetch(`http://localhost:3005/user/${uid}`);
    if (!response.ok) {
      throw new Error('Failed to retrieve user info');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const postUser = async (user) => {
  try {
    const response = await fetch(`http://localhost:3005/user`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to create user');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
