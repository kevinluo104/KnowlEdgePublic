import { createSlice } from '@reduxjs/toolkit';
import { getUserAsync, postUserAsync } from './UserThunks';

const initialState = {
  currentUser: {},
};
const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(postUserAsync.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      });
  },
});

export const userReducer = userSlice.reducer;
