import { auth } from '../../firebase';

const editInstructorProfile = async (uid, name) => {
  console.log(name);
  const idToken = await auth.currentUser.getIdToken();
  const response = await fetch(
    `http://localhost:3005/instructorProfile/${uid}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        headers: {
          Authorization: `${idToken}`,
        },
      },
      body: JSON.stringify(name),
    }
  );

  const data = await response.json();
  if (!response.ok) {
    const errorMsg = data?.message;
    throw new Error(errorMsg);
  }

  return data;
};

const getInstructorProfile = async (uid) => {
  const idToken = await auth.currentUser.getIdToken();
  const response = await fetch(
    `http://localhost:3005/instructorProfile/${uid}`,
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

export default {
  editInstructorProfile,
  getInstructorProfile,
};
