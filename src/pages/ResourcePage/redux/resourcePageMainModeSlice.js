import { createSlice } from '@reduxjs/toolkit';
import { setMainModeAsync, getMainModeAsync } from './thunks.js';

const initialState = {
  mode: '',
};

const mainModeSlice = createSlice({
  name: 'mode',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setMainModeAsync.fulfilled, (state, action) => {
        state.mode = action.payload.text;
        console.log("fds", state.mode);
      })
      .addCase(setMainModeAsync.pending, (state, action) => {
        console.log('pend');
      })
      .addCase(setMainModeAsync.rejected, (state, action) => {
        console.log('reject');
      })
      .addCase(getMainModeAsync.fulfilled, (state, action) => {
       console.log("fgadgasd", action.payload);
        state.mode = action.payload.mode;
        console.log("fds", state.mode);
      })
      .addCase(getMainModeAsync.pending, (state, action) => {
        console.log('pend get');
      })
      .addCase(getMainModeAsync.rejected, (state, action) => {
        console.log('reject get');
      });
  },
});

export const MainModeReducer = mainModeSlice.reducer;
