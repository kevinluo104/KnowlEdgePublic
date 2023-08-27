import React, { useState, useEffect } from 'react';
import {
  Modal,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUsersAsync,
  fetchContactsAsync,
  fetchContactRequestsAsync,
  addUserToContactsAsync,
} from './redux/ContactThunk';

const ContactModal = ({ open, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const users = useSelector((state) => state.contacts.users);
  const contacts = useSelector((state) => state.contacts.contacts);
  const contactRequests = useSelector(
    (state) => state.contacts.contactRequests
  );

  useEffect(() => {
    // Fetch users, contacts, and contact requests on mount
    dispatch(fetchUsersAsync());
    dispatch(fetchContactsAsync(currentUser.uid));
    dispatch(fetchContactRequestsAsync(currentUser.uid));
  }, [dispatch, currentUser]);

  const handleSearch = () => {
    // Filter users based on the search term matching the display name
    const searchResults = users.filter((user) =>
      user.displayName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(searchResults);
  };

  const handleSendRequest = () => {
    // Check if a user is selected and not already in contacts or has a pending request
    if (
      selectedUser &&
      !contacts.some((contact) => contact.uid === selectedUser.uid)
    ) {
      if (
        !contactRequests.some(
          (request) => request.senderId === selectedUser.uid
        )
      ) {
        // Dispatch an action to add the user to contacts
        dispatch(
          addUserToContactsAsync({
            userId: currentUser.uid,
            contactId: selectedUser.uid,
          })
        );
        setSelectedUser(null);
      } else {
        console.log('Contact request already sent to this user.');
      }
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          minWidth: '400px',
        }}
      ></div>
    </Modal>
  );
};

export default ContactModal;
