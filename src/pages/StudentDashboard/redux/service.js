import { auth } from '../../../firebase';

const fetchStudentInfo = async (uid) => {
  try {
    const idToken = await auth.currentUser.getIdToken();
    const response = await fetch(
      `http://localhost:3005/studentProfile/${uid}`,
      {
        method: 'GET',
        headers: {
          Authorization: `${idToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Request failed with status ' + response.status);
    }
    return await response.json();
  } catch (error) {
    throw new Error('An error occurred: ' + error.message);
  }
};

const patchStudentCourses = async (uid, newCourses) => {
  try {
    const idToken = await auth.currentUser.getIdToken();
    const response = await fetch(
      `http://localhost:3005/studentProfile/courses/${uid}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${idToken}`,
        },
        body: JSON.stringify({ courses: newCourses }),
      }
    );

    if (!response.ok) {
      throw new Error('Request failed with status ' + response.status);
    }
    return await response.json();
  } catch (error) {
    throw new Error('An error occurred: ' + error.message);
  }
};

const fetchAllCourses = async (uid) => {
  try {
    const idToken = await auth.currentUser.getIdToken();
    const response = await fetch(
      `http://localhost:3005/dashboard/courses/all/${uid}`,
      {
        method: 'GET',
        headers: {
          Authorization: `${idToken}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error('Request failed with status ' + response.status);
    }
    return await response.json();
  } catch (error) {
    throw new Error('An error occurred: ' + error.message);
  }
};

const patchStudentList = async(uid, courseToAdd) => {
  try {
    console.log("HERE22" + courseToAdd);
    const response = await fetch(
      `http://localhost:3005/course/`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({uid: uid, courses: courseToAdd }),
      }
    );

    if (!response.ok) {
      throw new Error('Request failed with status ' + response.status);
    }
    return await response.json();
  } catch (error) {
    throw new Error('An error occurred: ' + error.message);
  }
}

const deleteStudentList = async(uid, courseToDelete) => {
  try {
    console.log("HERE22" + courseToDelete);
    const response = await fetch(
      `http://localhost:3005/course/`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({uid: uid, courses: courseToDelete }),
      }
    );

    if (!response.ok) {
      throw new Error('Request failed with status ' + response.status);
    }
    return await response.json();
  } catch (error) {
    throw new Error('An error occurred: ' + error.message);
  }
}

export { fetchStudentInfo, patchStudentCourses, fetchAllCourses, patchStudentList, deleteStudentList };
