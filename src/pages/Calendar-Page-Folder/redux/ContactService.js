const BASE_URL = 'http://localhost:3005/contacts';

export const fetchUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users`);
    if (!response.ok) {
      throw new Error('Error fetching users');
    }
    return response.json();
  } catch (error) {
    throw error.message;
  }
};

export const fetchContacts = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}/contacts`);
    if (!response.ok) {
      throw new Error('Error fetching contacts');
    }
    return response.json();
  } catch (error) {
    throw error.message;
  }
};

export const fetchContactRequests = async (userId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/users/${userId}/contact-requests`
    );
    if (!response.ok) {
      throw new Error('Error fetching contact requests');
    }
    return response.json();
  } catch (error) {
    throw error.message;
  }
};

export const acceptContactRequest = async (requestId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/contact-requests/${requestId}/accept`,
      {
        method: 'POST',
      }
    );
    if (!response.ok) {
      throw new Error('Error accepting contact request');
    }
    return response.json();
  } catch (error) {
    throw error.message;
  }
};

export const addUserToContacts = async (userId, contactId) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contactId }),
    });
    if (!response.ok) {
      throw new Error('Error adding user to contacts');
    }
    return response.json();
  } catch (error) {
    throw error.message;
  }
};
