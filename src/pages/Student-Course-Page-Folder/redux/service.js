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

const addModule = async (card) => {
  const response = await fetch('http://localhost:3005/courseModule', {
      method: "POST",
      headers: {
          'Content-Type': 'application/json',
        },
      body: JSON.stringify(card),
  });

  const data = await response.json();
  if (!response.ok) {
    const errorMsg = data?.message;
    throw new Error(errorMsg);
  }

  return data;
}

const addSubmodule = async (card) => {
const response = await fetch('http://localhost:3005/courseSubmodule', {
  method: "POST",
  headers: {
    'Content-Type': 'application/json',
  },
body: JSON.stringify(card),
});

const data = await response.json();
if (!response.ok) {
const errorMsg = data?.message;
throw new Error(errorMsg);
}

return data;
}

const getModule = async (course) => {
  const response = await fetch('http://localhost:3005/courseModule/' + course, {
    method: "GET"
  });

  const data = await response.json();
  if (!response.ok) {
    const errorMsg = data?.message;
    throw new Error(errorMsg);
    }
    
    return data;
}

const getSubmodule = async () => {
  const response = await fetch('http://localhost:3005/courseSubmodule', {
    method: "GET"
  });

  const data = await response.json();
  if (!response.ok) {
    const errorMsg = data?.message;
    throw new Error(errorMsg);
    }
    
    return data;
}

const removeModule = async (course) => {
 await fetch('http://localhost:3005/courseModule/' + course, {
    method: "DELETE"
  });
  return course;
}

const removeSubmodule = async (submoduleId) => {
  await fetch('http://localhost:3005/courseSubmodule/' + submoduleId, {
    method: "DELETE"
  });
  return submoduleId;
}

const getNotes = async (course, notesUid) => {
  const response = await fetch(
    `http://localhost:3005/note/${course}/${notesUid}`,
    {
      method: 'GET',

    }
  );
  const data = await response.json();
  if (!response.ok) {
    const errorMsg = data?.message;
    throw new Error(errorMsg);
  }

  return data;
};

const getStudySets = async (uid) => {
  const idToken = await auth.currentUser.getIdToken();
  const response = await fetch(`http://localhost:3005/studysets/${uid}`, {
    method: 'GET',
    headers: {
      Authorization: `${idToken}`,
    },
  });
  return response.json();
};

export default {
  getAnnouncements,
  addModule,
  addSubmodule,
  getModule,
  getSubmodule,
  removeModule,
  removeSubmodule,
  getNotes,
  getStudySets
};
