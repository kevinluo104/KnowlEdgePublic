export const fetchStudentInfo = () => {
  return {
    type: 'FETCH_STUDENT_INFO',
  };
};

export const patchStudentCourses = (newCourses) => {
  return {
    type: 'PATCH_STUDENT_COURSES',
    payload: newCourses,
  };
};

export const fetchAllCourses = () => {
  return {
    type: 'FETCH_ALL_COURSES',
  };
};

export const addStudentToCourse = (payload) => {
  return {
    type: 'classlist/addStudentToCourse', // Match the action type used in thunks.js
    payload: payload,
  };
}

export const deleteStudentFromCourse = (payload) => {
  return {
    type: 'classlist/deleteStudentFromCourse', // Match the action type used in thunks.js
    payload: payload,
  };
}
