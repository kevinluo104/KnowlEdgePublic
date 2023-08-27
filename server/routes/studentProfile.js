var express = require('express');
var router = express.Router();
const { Student } = require('../database/model');
const admin = require('firebase-admin');

const serviceAccount = require('../knowledge-72d21-firebase-adminsdk-pc5sp-f043f98d9b.json');

let student = {
  preferredName: 'Bob Jones',
  faculty: 'Science',
  major: 'Computer Science',
  contact: 'bob.jones@gmail.com',
  image:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Twemoji_1f600.svg/800px-Twemoji_1f600.svg.png',
  aboutMe:
    "October arrived, spreading a damp chill over the grounds and into the castle. Madam Pomfrey, the nurse, was kept busy by a sudden spate of colds among the staff and students. Her Pepperup potion worked instantly, though it left the drinker smoking at the ears for several hours afterward. Ginny Weasley, who had been looking pale, was bullied into taking some by Percy. The steam pouring from under her vivid hair gave the impression that her whole head was on fire. Raindrops the size of bullets thundered on the castle windows for days on end; the lake rose, the flower beds turned into muddy streams, and Hagrid's pumpkins swelled to the size of garden sheds. Oliver Wood's enthusiasm for regular training sessions, however, was not dampened, which was why Harry was to be found, late one stormy Saturday afternoon a few days before Halloween, returning to Gryffindor Tower, drenched to the skin and splattered with mud.",
  courses: [],
};

// EDIT STUDENT PROFILE
// router.patch('/:uid', async function (req, res, next) {
//   try {
//     const idToken = req.headers.authorization;
//     const decodedToken = await admin.auth().verifyIdToken(idToken);
//     const tokenUid = decodedToken.uid;
//     const { uid } = req.params;

//     if (uid !== tokenUid) {
//       return res.status(401).json({ error: 'Unauthorized' });
//     }
//     const item = await Student.updateOne(
//       { faculty: 'Science' },
//       {
//         $set: {
//           preferredName: req.body.preferredName,
//           contact: req.body.contact,
//           aboutMe: req.body.aboutMe,
//         },
//       }
//     );
//   } catch (error) {
//     console.log(error);
//     return res.status(404).send('NOT FOUND');
//   }
//   student.preferredName = req.body.preferredName;
//   student.contact = req.body.contact;
//   student.aboutMe = req.body.aboutMe;
//   res.status(200).send(student);
// });

// router.get('/:uid', async function (req, res, next) {
//   const idToken = req.headers.authorization;
//   const decodedToken = await admin.auth().verifyIdToken(idToken);
//   const { uid } = req.params;
//   const tokenUid = decodedToken.uid;

//   if (uid !== tokenUid) {
//     return res.status(401).json({ error: 'Unauthorized' });
//   }
//   let items = [];
//   try {
//     items = await Student.find({uid:uid});
//   } catch (error) {
//     console.log(error);
//     return res.status(404).send('NOT FOUND');
//   }

//   let obj = {
//     preferredName: items[0].preferredName,
//     faculty: items[0].faculty,
//     major: items[0].major,
//     contact: items[0].contact,
//     image: items[0].image,
//     aboutMe: items[0].aboutMe,
//     courses: items[0].courses,
//   };

//   res.status(200).send(obj);
// });

router.get('/:uid', async function (req, res, next) {
  let item;
  const { uid } = req.params;
  const idToken = req.headers.authorization;
  const decodedToken = await admin.auth().verifyIdToken(idToken);
  const tokenUid = decodedToken.uid;

  if (tokenUid !== uid) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    item = await Student.findOne({ uid: uid });
    let obj = {
      preferredName: item.preferredName,
      faculty: item.faculty,
      major: item.major,
      contact: item.contact,
      image: item.image,
      aboutMe: item.aboutMe,
      courses: item.courses,
    };
    console.log(obj);
    res.status(200).send(obj);
  } catch (error) {
    console.log(error);
    return res.status(404).send('NOT FOUND');
  }
});

router.patch('/:uid', async function (req, res) {
  const { uid } = req.params;
  const studentData = req.body.student;

  const idToken = req.headers.authorization;
  const decodedToken = await admin.auth().verifyIdToken(idToken);
  const decodedUid = decodedToken.uid;

  if (decodedUid !== uid) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  Student.findOneAndUpdate({ uid: uid }, studentData, { new: true })
    .then((student) => {
      res.status(200).send(student);
    })
    .catch((error) => {
      res.status(404).json({ error: 'Failed to update student' });
    });
});

router.patch('/courses/:uid', async function (req, res, next) {
  const { courses } = req.body;
  const { uid } = req.params;

  const idToken = req.headers.authorization;
  const decodedToken = await admin.auth().verifyIdToken(idToken);
  const decodedUid = decodedToken.uid;

  if (decodedUid !== uid) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  console.log('in here');
  try {
    const updatedStudent = await Student.findOneAndUpdate(
      { uid: uid },
      { $set: { courses: courses } },
      { new: true }
    );
    console.log('in here');
    console.log(updatedStudent);

    if (updatedStudent === null) {
      return res.status(400).json({ error: 'Student does not exist' });
    } else {
      student.courses = courses;
      return res.status(200).json(updatedStudent);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
