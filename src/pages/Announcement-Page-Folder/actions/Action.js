// Code inspired from Workshop 2's react-redux-button-counter-2022 repo: https://github.com/danyakarras/react-redux-button-counter-2022
export const addAnnouncement = announcement => {
    return {
      type: 'ADD_ANNOUNCEMENT',
      payload: announcement
    };
  };

  
  export const removeAnnouncement = announcementID => {
    return {
      type: 'REMOVE_ANNOUNCEMENT',
      payload: announcementID
    };
  };
