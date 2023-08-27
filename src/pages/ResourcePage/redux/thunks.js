import { createAsyncThunk } from '@reduxjs/toolkit';
import { addComment, fetchComments, patchUpvotes, getCourseContent, getCourseStudentList, setResourceText, getResourceText, setMainMode, getMainMode } from './service';



export const fetchCommentsAsync = createAsyncThunk(
  'resourcePage/fetchComments',
  async ({ uid, resourceID }) => {
    return await fetchComments(uid, resourceID);
  }
);

export const addCommentAsync = createAsyncThunk(
  'resourcePage/addComment',
  async ({ uid, comment }) => {
    return await addComment(uid, comment);
  }
);

export const patchUpvotesAsync = createAsyncThunk(
  'resourcePage/patchUpvotes',
  async ({ uid, data }) => {
    console.log('in parch upvotes');
    return await patchUpvotes(uid, data);
  }
);

export const getCourseContentAsync = createAsyncThunk(
  'resourcePage/getContent',
  async ({ uid, courseIdentifier }) => {
    return await getCourseContent(uid, courseIdentifier);
  }
);

export const getCourseStudentListAsync = createAsyncThunk(
  'classlist/getCourseStudentList',
  async(courseTitle) => {
    return await getCourseStudentList(courseTitle);
  }
);

export const setResourceTextAsync = createAsyncThunk(
  'resource/setResourceText',
  async({text, course}) => {
    console.log("EA: " +  text + course);
    return await setResourceText(text, course);
  }
)


export const getResourceTextAsync = createAsyncThunk(
  'resource/getResourceText',
  async({courseTitle, resourceName}) => { 
    return await getResourceText(courseTitle, resourceName);
  }
)

export const setMainModeAsync = createAsyncThunk(
  'resource/setMainMode',
  async({mode, course}) => {
    console.log("HEWTE");
    return await setMainMode(mode, course);
  }
)

export const getMainModeAsync = createAsyncThunk(
  'resource/getMainMode',
  async({courseTitle, resourceName}) => { 
    return await getMainMode(courseTitle, resourceName);
  }
)

