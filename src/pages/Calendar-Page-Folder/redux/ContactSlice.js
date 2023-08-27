import { createSlice } from '@reduxjs/toolkit';
import {
  fetchUsersAsync,
  fetchContactsAsync,
  fetchContactRequestsAsync,
  acceptContactRequestAsync,
  addUserToContactsAsync,
} from './ContactThunk';

const initialState = {
  users: [],
  contacts: [],
  contactRequests: [],
  loading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsersAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchContactsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContactsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchContactsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchContactRequestsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContactRequestsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.contactRequests = action.payload;
      })
      .addCase(fetchContactRequestsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(acceptContactRequestAsync.fulfilled, (state, action) => {})
      .addCase(acceptContactRequestAsync.rejected, (state, action) => {})
      .addCase(addUserToContactsAsync.fulfilled, (state, action) => {})
      .addCase(addUserToContactsAsync.rejected, (state, action) => {});
  },
});
export const contactsReducer = contactsSlice.reducer;
