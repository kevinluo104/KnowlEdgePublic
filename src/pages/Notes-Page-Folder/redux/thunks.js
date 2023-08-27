import { createAsyncThunk } from '@reduxjs/toolkit';
import { actionTypes } from './actionTypes';
import ItemService from './service';

export const getNotesAsync = createAsyncThunk(
  actionTypes.GET_ANNOUNCEMENTS,
  async ({ course, notesUid }) => {
    return await ItemService.getNotes(course, notesUid);
  }
);

export const addNoteAsync = createAsyncThunk(
  actionTypes.ADD_NOTE,
  async (card) => {
    return await ItemService.addNote(card);
  }
);

export const removeNoteAsync = createAsyncThunk(
  actionTypes.REMOVE_NOTE,
  async (id, { fulfillWithValue }) => {
    return fulfillWithValue(await ItemService.removeNote(id));
  }
);

export const updateNoteTitleAsync = createAsyncThunk(
  actionTypes.CHANGE_NOTE_TITLE,
  async ({ id, title }) => {
    return await ItemService.changeNoteTitle(id, title);
  }
);

export const updateNoteParagraphAsync = createAsyncThunk(
  actionTypes.CHANGE_NOTE_PARAGRAPH,
  async ({ id, paragraph }) => {
    return await ItemService.changeNoteParagraph(id, paragraph);
  }
);
