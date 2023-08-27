// Code inpsired from Workshop 3's cs455-express-demo repo: https://github.com/svmah/cs455-express-demo/tree/add-server

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

const addNote = async (card) => {
  const response = await fetch(`http://localhost:3005/note`, {
    method: 'POST',
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
};

const removeNote = async (id) => {
  await fetch(`http://localhost:3005/note/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return id;
};

const changeNoteTitle = async (noteId, title) => {
  const response = await fetch(`http://localhost:3005/note/${noteId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ noteTitle: title }),
  });

  const data = await response.json();
  if (!response.ok) {
    const errorMsg = data?.message;
    throw new Error(errorMsg);
  }

  return data;
};

const changeNoteParagraph = async (noteId, paragraph) => {
  const response = await fetch(`http://localhost:3005/note/${noteId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ noteParagraph: paragraph }),
  });
  const data = await response.json();
  if (!response.ok) {
    const errorMsg = data?.message;
    throw new Error(errorMsg);
  }

  return data;
};

export default {
  getNotes,
  addNote,
  removeNote,
  changeNoteTitle,
  changeNoteParagraph,
};
