// Code inpsired from Workshop 3's cs455-express-demo repo: https://github.com/svmah/cs455-express-demo/tree/add-server
// Mongoose learnt from: https://www.freecodecamp.org/news/introduction-to-mongoose-for-mongodb-d2a7aa593c57/ and the repo provided to us during workshop 4: https://github.com/joshuacassidygrant/mongo-sample
var express = require('express');
var router = express.Router();
const { Announcement } = require('../database/model');
const admin = require('firebase-admin');

const serviceAccount = require('../knowledge-72d21-firebase-adminsdk-pc5sp-f043f98d9b.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

router.get('/:course/:uid', async function (req, res, next) {
  var announcements = [];
  const idToken = req.headers.authorization;
  const { uid } = req.params;
  const decodedToken = await admin.auth().verifyIdToken(idToken);
  const tokenuid = decodedToken.uid;
  if (tokenuid !== uid) { 
    return res.status(401).json({ error: 'Unauthorized' });
  }
  if (req.params.course === 'all') {
    announcements = await Announcement.find({});
  } else {
    announcements = await Announcement.find({
      announcementCourse: req.params.course,
    });
  }
  res.status(200).send(announcements);
});

router.post('/:uid', async function (req, res, next) {
  const idToken = req.headers.authorization;
  const { uid } = req.params;
  const decodedToken = await admin.auth().verifyIdToken(idToken);
  const tokenUid = decodedToken.uid;
  if (tokenUid !== uid) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const announcementToServer = new Announcement(req.body);
  announcementToServer.save();
  res.status(201).send(req.body);
});

router.delete('/:uid/:id', function (req, res, next) {
  const idToken = req.headers.authorization;
  const { uid } = req.params;
  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      const tokenUid = decodedToken.uid;
      if (tokenUid !== uid) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
    })
    .then(() =>
      Announcement.findOneAndRemove({
        announcementId: Number(req.params.id),
      })
    );
  res.status(204).send();
});
module.exports = router;
