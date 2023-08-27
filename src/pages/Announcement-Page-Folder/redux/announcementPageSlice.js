// Code inspired from Workshop 2's react-redux-button-counter-2022 repo: https://github.com/danyakarras/react-redux-button-counter-2022
// Code inpsired from Workshop 3's cs455-express-demo repo: https://github.com/svmah/cs455-express-demo/tree/add-server
import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATE } from '../../../utils.js';
import {
  getAnnouncementsAsync,
  addAnnouncementAsync,
  removeAnnouncementAsync,
} from './thunks';

const initialState = {
  announcements: [],
  getAnnouncements: REQUEST_STATE.IDLE,
  removeAnnouncement: REQUEST_STATE.IDLE,
  addAnnouncement: REQUEST_STATE.IDLE,
};

const announcementPageSlice = createSlice({
  name: 'announcementPage',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAnnouncementsAsync.fulfilled, (state, action) => {
        state.getAnnouncements = REQUEST_STATE.FULFILLED;
        state.announcements = action.payload;
      })
      .addCase(addAnnouncementAsync.fulfilled, (state, action) => {
        state.addAnnouncement = REQUEST_STATE.FULFILLED;
        state.announcements = [...state.announcements, action.payload];
      })
      .addCase(removeAnnouncementAsync.fulfilled, (state, action) => {
        state.removeAnnouncement = REQUEST_STATE.FULFILLED;
        state.announcements = state.announcements.filter(
          (announcement) => announcement.announcementId !== action.payload
        );
      });
  },
});

export const announcementPageReducer = announcementPageSlice.reducer;
