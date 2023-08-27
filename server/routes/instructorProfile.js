var express = require('express');
var router = express.Router();
const { Instructor } = require('../database/model');

const admin = require('firebase-admin');

const serviceAccount = require('../knowledge-72d21-firebase-adminsdk-pc5sp-f043f98d9b.json');

let instructor = {
  preferredName: 'Professor Jones',
  faculty: 'Science',
  field: 'Computer Science',
  contact: 'bob.jones@gmail.com',
  image:
    'https://creazilla-store.fra1.digitaloceanspaces.com/emojis/46920/old-man-emoji-clipart-xl.png',
  aboutMe:
    "October arrived, spreading a damp chill over the grounds and into the castle. Madam Pomfrey, the nurse, was kept busy by a sudden spate of colds among the staff and students. Her Pepperup potion worked instantly, though it left the drinker smoking at the ears for several hours afterward. Ginny Weasley, who had been looking pale, was bullied into taking some by Percy. The steam pouring from under her vivid hair gave the impression that her whole head was on fire. Raindrops the size of bullets thundered on the castle windows for days on end; the lake rose, the flower beds turned into muddy streams, and Hagrid's pumpkins swelled to the size of garden sheds. Oliver Wood's enthusiasm for regular training sessions, however, was not dampened, which was why Harry was to be found, late one stormy Saturday afternoon a few days before Halloween, returning to Gryffindor Tower, drenched to the skin and splattered with mud.",
  courses: [],
};

// EDIT STUDENT PROFILE
router.patch('/:uid', async function (req, res, next) {
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const tokenUid = decodedToken.uid;
    const { uid } = req.params;

    if (uid !== tokenUid) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const item = await Instructor.updateOne(
      { faculty: 'Science' },
      {
        $set: {
          preferredName: req.body.preferredName,
          contact: req.body.contact,
          aboutMe: req.body.aboutMe,
        },
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(404).send('NOT FOUND');
  }
  instructor.preferredName = req.body.preferredName;
  instructor.contact = req.body.contact;
  instructor.aboutMe = req.body.aboutMe;
  res.status(200).send(instructor);
});

router.get('/:uid', async function (req, res, next) {
  const { uid } = req.params;
  const idToken = req.headers.authorization;
  const decodedToken = await admin.auth().verifyIdToken(idToken);
  const tokenUid = decodedToken.uid;
 // const { uid } = req.params;

  if (uid !== tokenUid) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  let items = [];
  try {
    items = await Instructor.find();
  } catch (error) {
    console.log(error);
    return res.status(404).send('NOT FOUND');
  }

  let obj = {
    preferredName: items[0].preferredName,
    faculty: items[0].faculty,
    field: items[0].field,
    contact: items[0].contact,
    image: items[0].image,
    aboutMe: items[0].aboutMe,
    courses: items[0].courses,
  };

  res.status(200).send(obj);
});

router.patch('/courses/:uid', async function (req, res, next) {
  const { courses } = req.body;
  const { uid } = req.params;
  try {
    // TODO: need to change to findbyidandupdate
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const tokenUid = decodedToken.uid;

    if (uid !== tokenUid) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const updatedInstructor = await Instructor.updateOne(
      {},
      { $set: { courses: courses } },
      { new: true }
    );

    if (updatedInstructor === null) {
      return res.status(400).json({ error: 'Instructor does not exist' });
    } else {
      instructor.courses = courses;
      return res.status(200).json(updatedInstructor);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
