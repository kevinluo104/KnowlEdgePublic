// Code inspired from Workshop 2's react-redux-button-counter-2022 repo: https://github.com/danyakarras/react-redux-button-counter-2022
export const addEvent = (event) => {
  return {
    type: 'ADD_EVENT',
    payload: event,
  };
};

export const editEvent = (event) => {
  return {
    type: 'EDIT_EVENT',
    payload: event,
  };
};

export const deleteEvent = (eventId) => {
  return {
    type: 'DELETE_EVENT',
    payload: eventId,
  };
};
