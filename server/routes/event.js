var express = require('express');
var router = express.Router();
const { Event } = require('../database/model');
const admin = require('firebase-admin');

const serviceAccount = require('../knowledge-72d21-firebase-adminsdk-pc5sp-f043f98d9b.json');

router.get('/:uid', (req, res) => {
  const { uid } = req.params;
  const idToken = req.headers.authorization;
  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      const tokenuid = decodedToken.uid;
      if (tokenuid !== uid) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }
      return uid;
    })
    .then((uid) => Event.find({ $or: [{ uid: uid }, { published: true }] }))
    .then((userEvents) => {
      res.status(200).send(userEvents);
    })
    .catch((error) => {
      res.status(404).json({ error: 'Failed to retrieve events' });
    });
}); 

router.post('/:uid', (req, res) => {
  const { uid } = req.params;
  const eventData = {
    uid: uid,
    completed: req.body.completed || false,
    title: req.body.title || '',
    start: req.body.start || '',
    end: req.body.end || '',
    location: req.body.location || '',
    links: req.body.links || [],
    type: req.body.type || '',
    course: req.body.course || '',
    published: req.body.published || false,
    deadline: req.body.deadline || '',
    desc: req.body.desc || '',
    recurrence: req.body.recurrence || {},
  };

  const idToken = req.headers.authorization;
  const newEvent = new Event({ uid: uid, ...eventData });

  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      const tokenuid = decodedToken.uid;
      if (tokenuid !== uid) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }
    })
    .then(() => newEvent.save())
    .then(() => {
      Event.find({ uid: uid }).then((events) => {
        res.status(200).send(events);
      });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to create new Event' });
    });
});

router.put('/:uid/:eventId', (req, res) => {
  const { uid, eventId } = req.params;
  const eventData = req.body;
  const idToken = req.headers.authorization;

  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      const tokenuid = decodedToken.uid;
      if (tokenuid !== uid) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }
    })
    .then(() =>
      Event.findOneAndUpdate({ _id: eventId, uid: uid }, eventData, {
        new: true,
      })
    )
    .then((event) => {
      res.status(200).send(event);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to update event' });
    });
});

router.delete('/:uid/:eventId', (req, res) => {
  const { uid, eventId } = req.params;
  const idToken = req.headers.authorization;

  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      const tokenuid = decodedToken.uid;
      if (tokenuid !== uid) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }
    })
    .then(() => Event.findOneAndDelete({ _id: eventId }))
    .then(() => {
      res.status(200).send(eventId);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to delete event' });
    });
});

module.exports = router;
