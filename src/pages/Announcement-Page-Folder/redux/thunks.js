// Code inpsired from Workshop 3's cs455-express-demo repo: https://github.com/svmah/cs455-express-demo/tree/add-server
import { createAsyncThunk } from '@reduxjs/toolkit';
import { actionTypes } from './actionTypes';
import ItemService from './service';

export const getAnnouncementsAsync = createAsyncThunk(
  actionTypes.GET_ANNOUNCEMENTS,
  async ({ uid, course, courses }) => {
    return await ItemService.getAnnouncements(uid, course, courses);
  }
);

export const addAnnouncementAsync = createAsyncThunk(
  actionTypes.ADD_ANNOUNCEMENT,
  async ({ uid, card }) => {
    return await ItemService.addAnnouncement(uid, card);
  }
);

export const removeAnnouncementAsync = createAsyncThunk(
  actionTypes.REMOVE_ANNOUNCEMENT,
  async ({ uid, id }, { fulfillWithValue }) => {
    return fulfillWithValue(await ItemService.removeAnnouncement(uid, id));
  }
);
