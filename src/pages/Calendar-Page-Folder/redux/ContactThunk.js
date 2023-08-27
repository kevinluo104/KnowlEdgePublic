import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchUsers as fetchUsersService,
  fetchContacts as fetchContactsService,
  fetchContactRequests as fetchContactRequestsService,
  acceptContactRequest as acceptContactRequestService,
  addUserToContacts as addUserToContactsService,
} from './ContactService';

export const fetchUsersAsync = createAsyncThunk(
  'contacts/fetchUsers',
  async () => {
    try {
      const users = await fetchUsersService();
      return users;
    } catch (error) {
      throw error;
    }
  }
);

// Thunk for fetching contacts for a user
export const fetchContactsAsync = createAsyncThunk(
  'contacts/fetchContacts',
  async (userId) => {
    try {
      const contacts = await fetchContactsService(userId);
      return contacts;
    } catch (error) {
      throw error;
    }
  }
);

// Thunk for fetching contact requests for a user
export const fetchContactRequestsAsync = createAsyncThunk(
  'contacts/fetchContactRequests',
  async (userId) => {
    try {
      const contactRequests = await fetchContactRequestsService(userId);
      return contactRequests;
    } catch (error) {
      throw error;
    }
  }
);

// Thunk for accepting a contact request
export const acceptContactRequestAsync = createAsyncThunk(
  'contacts/acceptContactRequest',
  async (requestId) => {
    try {
      const response = await acceptContactRequestService(requestId);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

// Thunk for adding a user to contacts
export const addUserToContactsAsync = createAsyncThunk(
  'contacts/addUserToContacts',
  async ({ userId, contactId }) => {
    try {
      const response = await addUserToContactsService(userId, contactId);
      return response;
    } catch (error) {
      throw error;
    }
  }
);
