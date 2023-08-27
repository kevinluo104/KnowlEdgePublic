import { createSlice } from '@reduxjs/toolkit';
import {
  fetchStudentInfoAsync,
  patchStudentCoursesAsync,
  fetchAllCoursesAsync,
} from './thunks.js';

const initialState = {
  showEnrollModal: false,
  searchContent: '',
  studentInfo: '',
  allCourses: '',
};

const studentDashboardSlice = createSlice({
  name: 'studentDashboard',
  initialState,
  reducers: {
    setEnrollModal: (state, action) => {
      state.showEnrollModal = action.payload;
    },
    setSearchContent: (state, action) => {
      state.searchContent = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentInfoAsync.fulfilled, (state, action) => {
        state.studentInfo = action.payload;
      })
      .addCase(patchStudentCoursesAsync.fulfilled, (state, action) => {
        state.studentInfo = {
          ...state.studentInfo,
          courses: [...action.meta.arg.updatedCourses],
        };
      })
      .addCase(fetchAllCoursesAsync.fulfilled, (state, action) => {
        state.allCourses = action.payload;
      });
  },
});

export const { setEnrollModal, setSearchContent } =
  studentDashboardSlice.actions;
const studentDashboardReducer = studentDashboardSlice.reducer;
export default studentDashboardReducer;
