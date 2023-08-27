import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATE } from '../../utils.js';
import {
  editStudentProfileAsync,
  editStudentProfileForUserAsync,
  getStudentProfileAsync,
  getStudentProfileForUserAsync,
} from './thunks';

// REDUCER TO SLICE https://www.youtube.com/watch?v=Fg-Anp4suwc&ab_channel=CodeBucks

const initialState = {
  student: {},
};

const studentProfileSlice = createSlice({
  name: 'studentProfile',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editStudentProfileAsync.fulfilled, (state, action) => {
        state.editStudentProfile = REQUEST_STATE.FULFILLED;
        state.student = action.payload;
      })
      .addCase(getStudentProfileAsync.fulfilled, (state, action) => {
        state.student = action.payload;
      })
      .addCase(getStudentProfileForUserAsync.fulfilled, (state, action) => {
        state.student = action.payload;
      })
      .addCase(editStudentProfileForUserAsync.fulfilled, (state, action) => {
        state.student = action.payload;
      });
  },
});

export const studentProfileRed = studentProfileSlice.reducer;
