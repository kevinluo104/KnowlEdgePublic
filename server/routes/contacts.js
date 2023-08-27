const express = require('express');
const router = express.Router();
const { User } = require('../database/model');
const { ContactRequest } = require('../database/model');

router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

router.get('/users/:userId/contacts', async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findOne({ uid: userId }).populate('contacts');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user.contacts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching contacts' });
  }
});

router.get('/users/:userId/contact-requests', async (req, res) => {
  const { userId } = req.params;
  try {
    const contactRequests = await ContactRequest.find({
      $or: [{ senderId: userId }, { receiverId: userId }],
    })
      .populate('senderId')
      .populate('receiverId');

    // If there are no contact requests, send an empty array
    if (!contactRequests || contactRequests.length === 0) {
      console.log('No contact requests found.');
      return res.json([]);
    } else {
      console.log('Contact requests found:', contactRequests);
      return res.json(contactRequests);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error fetching contact requests' });
  }
});

router.post('/contact-requests/:requestId/accept', async (req, res) => {
  const { requestId } = req.params;
  try {
    const contactRequest = await ContactRequest.findById(requestId);
    if (!contactRequest) {
      return res.status(404).json({ error: 'Contact request not found' });
    }

    if (contactRequest.status !== 'pending') {
      return res.status(400).json({
        error: 'Contact request has already been accepted or rejected',
      });
    }

    contactRequest.status = 'accepted';
    await contactRequest.save();

    const receiver = await User.findById(contactRequest.receiverId);
    if (!receiver) {
      return res.status(404).json({ error: 'Receiver user not found' });
    }
    receiver.contacts.push({ uid: contactRequest.senderId });
    await receiver.save();

    res.json({ message: 'Contact request accepted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error accepting contact request' });
  }
});

router.post('/contact-requests/:requestId/accept', async (req, res) => {
  const { requestId } = req.params;
  try {
    const contactRequest = await ContactRequest.findById(requestId);
    if (!contactRequest) {
      return res.status(404).json({ error: 'Contact request not found' });
    }

    if (contactRequest.status !== 'pending') {
      return res.status(400).json({
        error: 'Contact request has already been accepted or rejected',
      });
    }

    contactRequest.status = 'accepted';
    await contactRequest.save();

    const receiver = await User.findOne({ uid: contactRequest.receiverId });
    if (!receiver) {
      return res.status(404).json({ error: 'Receiver user not found' });
    }
    receiver.contacts.push({ uid: contactRequest.senderId });
    await receiver.save();

    // Update the status of the contact request in the database
    await contactRequest.save();

    res.json({ message: 'Contact request accepted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error accepting contact request' });
  }
});

module.exports = router;
