export const fetchComments = () => {
  return {
    type: 'FETCH_PAGE_COMMENTS',
  };
};

export const addComment = (comment) => {
  return {
    type: 'ADD_COMMENT',
    payload: comment,
  };
};

export const patchUpvotes = (data) => {
  return {
    type: 'PATCH_UPVOTES',
  };
};


export const getContent = () => {
  return {
    type: 'GET_CONTENT',
  };
};

export const addStudent = (uid) => {
  return {
    type: 'ADD_STUDENT',
    payload: uid,
  };
};

