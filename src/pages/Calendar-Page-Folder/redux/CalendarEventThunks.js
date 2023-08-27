import {
  addEvent,
  getEvents,
  deleteEvent,
  editEvent,
} from './CalendarEventService';
const { createAsyncThunk } = require('@reduxjs/toolkit');

export const postEventAsync = createAsyncThunk(
  'events/postEventAsync',
  async ({ uid, event }) => {
    const data = await addEvent(uid, event);
    return data;
  }
);

export const getEventsAsync = createAsyncThunk(
  'events/getEventsAsync',
  async (uid) => {
    const res = await getEvents(uid);
    return res;
  }
);

export const putEventAsync = createAsyncThunk(
  'events/putEventAsync',
  async ({ uid, event }) => {
    try {
      const data = await editEvent(uid, event);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteEventAsync = createAsyncThunk(
  'events/deleteEventAsync',
  async ({ uid, eventId }) => {
    const data = await deleteEvent(uid, eventId);
    return eventId;
  }
);
