import { auth } from '../../firebase';

const editStudentProfile = async ({ uid, name }) => {
  const idToken = await auth.currentUser.getIdToken();
  const response = await fetch(`http://localhost:3005/studentProfile/${uid}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${idToken}`,
    },
    body: JSON.stringify(name),
  });

  const data = await response.json();
  if (!response.ok) {
    const errorMsg = data?.message;
    throw new Error(errorMsg);
  }

  return data;
};

const getStudentProfile = async (uid) => {
  const idToken = await auth.currentUser.getIdToken();
  const response = await fetch(`http://localhost:3005/studentProfile/${uid}`, {
    method: 'GET',
    headers: {
      Authorization: `${idToken}`,
    },
  });

  const data = await response.json();
  if (!response.ok) {
    const errorMsg = data?.message;
    throw new Error(errorMsg);
  }

  return data;
};

const getStudentProfileForUser = async (uid) => {
  const idToken = await auth.currentUser.getIdToken();
  const response = await fetch(`http://localhost:3005/studentProfile/${uid}`, {
    method: 'GET',
    headers: {
      Authorization: `${idToken}`,
    },
  });

  const data = await response.json();
  if (!response.ok) {
    const errorMsg = data?.message;
    throw new Error(errorMsg);
  }

  return data;
};

const editStudentProfileForUser = async (uid, student) => {
  const idToken = await auth.currentUser.getIdToken();
  const response = await fetch(`http://localhost:3005/studentProfile/${uid}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${idToken}`,
    },
    body: JSON.stringify(student),
  });

  const data = await response.json();
  if (!response.ok) {
    const errorMsg = data?.message;
    throw new Error(errorMsg);
  }
  console.log('after patch request');
  console.log(data);
  return data;
};

export default {
  editStudentProfile,
  getStudentProfile,
  getStudentProfileForUser,
  editStudentProfileForUser,
};
