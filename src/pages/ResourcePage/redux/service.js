import { auth } from '../../../firebase';

const fetchComments = async (uid, resourceId) => {
  try {
    const idToken = await auth.currentUser.getIdToken();
    const response = await fetch(
      `http://localhost:3005/dashboard/comments/${uid}/${resourceId}`,
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

const addComment = async (uid, comment) => {
  try {
    const idToken = await auth.currentUser.getIdToken();
    const response = await fetch(
      `http://localhost:3005/dashboard/comments/${uid}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${idToken}`,
        },
        body: JSON.stringify(comment),
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

const patchUpvotes = async (uid, data) => {
  console.log('in service patch upvotes');
  try {
    const idToken = await auth.currentUser.getIdToken();
    const response = await fetch(
      `http://localhost:3005/dashboard/comments/${uid}/${data.commentId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${idToken}`,
        },
        body: JSON.stringify(data),
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

const getCourseContent = async (uid, courseIdentifer) => {
  console.log('YOOOOOOOOOOOOOOqqqwwwww');

  try {
    const idToken = await auth.currentUser.getIdToken();
    const response = await fetch(
      `http://localhost:3005/resource/${uid}/${courseIdentifer}`,
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

const getCourseStudentList = async (courseIdentifer) => {
  //console.log('YOOOOOOOOOOOOOOqqqwwwww');
  try {
    const response = await fetch(
      `http://localhost:3005/course/` + courseIdentifer
    );
    if (!response.ok) {
      throw new Error('Request failed with status ' + response.status);
    }
    return await response.json();
  } catch (error) {
    throw new Error('An error occurred: ' + error.message);
  }
};

const setResourceText = async (text, course) => {
  try {
    const response = await fetch(
      `http://localhost:3005/text/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: text, course: course}),
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


const getResourceText = async (course, resourceName) => {
  console.log("Easdsad: " + course + resourceName);
try {
    //const idToken = await auth.currentUser.getIdToken();
    const response = await fetch(
      `http://localhost:3005/text/${course}/${resourceName}`,
      {
        method: 'GET',
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

const setMainMode = async (mode, course) => {
  try {

    const response = await fetch(
      `http://localhost:3005/mainMode/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mode: mode, course: course}),
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

const getMainMode = async (course, resourceName) => {
  console.log("Easdsad: " + course + resourceName);
try {
    //const idToken = await auth.currentUser.getIdToken();
    const response = await fetch(
      `http://localhost:3005/mainMode/${course}/${resourceName}`,
      {
        method: 'GET',
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

export { fetchComments, addComment, patchUpvotes, getCourseContent, getCourseStudentList, setResourceText, getResourceText, setMainMode, getMainMode };
