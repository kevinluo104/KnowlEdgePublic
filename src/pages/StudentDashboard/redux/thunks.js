import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchStudentInfo,
  patchStudentCourses,
  fetchAllCourses,
  patchStudentList,
  deleteStudentList
} from './service';
import { actionTypes } from '../actions/actionTypes';

export const fetchStudentInfoAsync = createAsyncThunk(
  'studentDashboard/fetchStudentInfo',
  async (uid) => {
    return await fetchStudentInfo(uid);
  }
);

export const patchStudentCoursesAsync = createAsyncThunk(
  'studentDashboard/patchStudentCourses',
  async ({ uid, updatedCourses }) => {
    return await patchStudentCourses(uid, updatedCourses);
  }
);

export const fetchAllCoursesAsync = createAsyncThunk(
  'studentDashboard/fetchAllCourses',
  async (uid) => {
    return await fetchAllCourses(uid);
  }
);

export const addStudentToCourseAsync = createAsyncThunk(
  'classlist/addStudentToCourse',
  async ({ uid, course }) => {
    try {
      console.log("HEREEEE" + JSON.stringify(course));
      return await patchStudentList(uid, course);
    } catch (error) {
      console.error('addStudentToCourseAsync Error:', error);
      // Optionally, you can throw the error again to ensure it gets propagated to the rejected case
      throw error;
    }
  }
);

export const deleteStudentFromCourseAsync = createAsyncThunk(
  actionTypes.DELETE_STUDENT,
  async({uid, course}) => {
    console.log("HEREEEE" + JSON.stringify(course));
    return await deleteStudentList(uid, course);
  });

