import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUser, postUser } from './UserService';

export const getUserAsync = createAsyncThunk(
  'user/getUserAsync',
  async (uid, { rejectWithValue }) => {
    try {
      const response = await getUser(uid);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const postUserAsync = createAsyncThunk(
  'user/postUserAsync',
  async (user, { rejectWithValue }) => {
    try {
      const response = await postUser(user);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
