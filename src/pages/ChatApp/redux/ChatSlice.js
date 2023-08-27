import { createSlice } from '@reduxjs/toolkit';

export const SCREENS = {
  HOME: 'Home',
  CONVERSATION: 'CONVERSATION',
  SEARCH: 'SEARCH',
  FORM: 'FORM',
};

const initialState = {
  screen: { name: SCREENS.HOME },
  viewPanel: false,
  chats: [],
  messagesList: {},
  viewModeIsSmall: true,
};

const ChatSlice = createSlice({
  name: 'Chat',
  initialState,
  reducers: {
    setScreen: (state, action) => {
      state.screen = action.payload;
    },
    setViewPanel: (state, action) => {
      state.viewPanel = action.payload;
    },
    updateChats: (state, action) => {
      state.chats = action.payload;
    },
    updateMessages: (state, action) => {
      const { chatID, data } = action.payload;
      state.messagesList[chatID] = data;
    },
    setViewModeIsSmall: (state, action) => {
      state.viewModeIsSmall = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const {
  setScreen,
  setViewPanel,
  updateChats,
  updateMessages,
  setViewModeIsSmall,
} = ChatSlice.actions;
const ChatReducer = ChatSlice.reducer;
export default ChatReducer;
