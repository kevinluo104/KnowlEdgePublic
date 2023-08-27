// Code inpsired from Workshop 3's cs455-express-demo repo: https://github.com/svmah/cs455-express-demo/tree/add-server
import { createAsyncThunk } from '@reduxjs/toolkit';
import { actionTypes } from './actionTypes';
import ItemService from './service';

export const getAnnouncementsAsync = createAsyncThunk(
  actionTypes.GET_ANNOUNCEMENTS,
  async ({ uid, course }) => {
    return await ItemService.getAnnouncements(uid, course);
  }
);

export const addModuleAsync = createAsyncThunk(
  actionTypes.ADD_MODULE,
  async (card) => {
      return await ItemService.addModule(card);
  }
)

export const addSubmoduleAsync = createAsyncThunk(
  actionTypes.ADD_SUBMODULE,
  async (card) => {
      return await ItemService.addSubmodule(card);
  }
)

export const getSubmoduleAsync = createAsyncThunk(
  actionTypes.GET_SUBMODULE,
  async () => {
    return await ItemService.getSubmodule();
  }
)

export const getModuleAsync = createAsyncThunk(
  actionTypes.GET_MODULE,
  async (course) => {
    return await ItemService.getModule(course);
  }
)

export const removeModuleAsync = createAsyncThunk(
  actionTypes.REMOVE_MODULE,
  async (course , { fulfillWithValue }) => {
    return fulfillWithValue(await ItemService.removeModule(course));
  }
)

export const removeSubmoduleAsync = createAsyncThunk(
  actionTypes.REMOVE_SUBMODULE,
  async (submoduleId, {fulfillWithValue}) => {
    return fulfillWithValue(await ItemService.removeSubmodule(submoduleId));
  }
)

export const getNotesAsync = createAsyncThunk(
  actionTypes.GET_NOTE,
  async ({ course, notesUid }) => {
    return await ItemService.getNotes(course,notesUid);
  }
);

export const getStudySetsAsync = createAsyncThunk(
  actionTypes.GET_STUDYSETS,
  async (uid) => {
    return await ItemService.getStudySets(uid);
  }
);