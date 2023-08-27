import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATE } from '../../utils.js';
import { editInstructorProfileAsync, getInstructorProfileAsync } from './thunks';

// REDUCER TO SLICE https://www.youtube.com/watch?v=Fg-Anp4suwc&ab_channel=CodeBucks

const initialState = {
  instructor: {
  },
};

const instructorProfileSlice = createSlice({
  name: 'instructorProfile',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(editInstructorProfileAsync.fulfilled, (state, action) => {
      state.editInstructorProfile = REQUEST_STATE.FULFILLED;
      state.instructor = action.payload;
    })
    .addCase(getInstructorProfileAsync.fulfilled, (state, action) => {
      state.instructor = action.payload;
    })
  },
});

export const instructorProfileRed = instructorProfileSlice.reducer;
