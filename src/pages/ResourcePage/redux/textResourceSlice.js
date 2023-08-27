import { createSlice } from '@reduxjs/toolkit';
import { setResourceTextAsync, getResourceTextAsync } from './thunks.js';

const initialState = {
  text: '',
};

const resourceTextSlice = createSlice({
  name: 'slice',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setResourceTextAsync.fulfilled, (state, action) => {
        state.text = action.payload.text;
      })
      .addCase(setResourceTextAsync.pending, (state, action) => {
        console.log('pend');
      })
      .addCase(setResourceTextAsync.rejected, (state, action) => {
        console.log('reject');
      })
      .addCase(getResourceTextAsync.fulfilled, (state, action) => {
       console.log("success get")
        state.text = action.payload.text;
      })
      .addCase(getResourceTextAsync.pending, (state, action) => {
        console.log('pend get');
      })
      .addCase(getResourceTextAsync.rejected, (state, action) => {
        console.log('reject get');
      });
  },
});

export const ResourceTextReducer = resourceTextSlice.reducer;
