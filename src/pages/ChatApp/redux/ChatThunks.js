import { createAsyncThunk } from '@reduxjs/toolkit';
import { sendNewMessage } from './ChatService';

export const sendNewMessageAsync = createAsyncThunk(
  'ChatReducer/sendNewMessageAsync',
  async ({ chatID, content, sender_id }) => {
    try {
      return await sendNewMessage(chatID, content, sender_id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
