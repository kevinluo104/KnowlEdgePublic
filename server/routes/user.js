var express = require('express');
var router = express.Router();
const { User } = require('../database/model');
const { Student, Instructor } = require('../database/model');
// Step 3: Extract user information from Firebase (Assuming Firebase Authentication is set up)

router.get('/:uid', (req, res) => {
  const { uid } = req.params;
  User.findOne({ uid })
    .then((existingUser) => {
      if (existingUser) {
        res.status(200).send(existingUser);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: 'Failed to retrieve user from the database' });
    });
});

router.post('/', async (req, res) => {
  try {
    const { uid, email, displayName, profilePicture, instructor, employeeId } =
      req.body;
    // Assuming you have a route that receives this data from Firebase
    // Step 4: Retrieve the user from MongoDB by UID using Mongoose

    const existingUser = await User.findOne({ uid });
    if (existingUser) {
      return res.status(200).send(existingUser);
    }
    const newUser = new User({
      uid: uid,
      email: email,
      displayName: displayName,
      instructor: instructor,
      employeeId: employeeId,
    });
    var preferredName = displayName || '';
    var faculty = 'Not specified';
    var major = 'Not specified';
    var contact = email;
    var image = profilePicture
      ? profilePicture
      : 'https://freesvg.org/img/abstract-user-flat-4.png';
    var aboutMe = 'Not specified';

    if (!instructor) {
      const student = new Student({
        uid,
        preferredName,
        faculty,
        major,
        contact,
        image,
        aboutMe,
      });
      student.save();
      newUser.save();
    } else {
      const instructor = new Instructor({
        uid,
        preferredName,
        faculty,
        major,
        contact,
        image,
        aboutMe,
        courses: [],
      });
      instructor.save();
    }
    res.status(200).send(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save user information' });
  }
});

router.get('/studentID/:id', async (req, res) => {
  const uid = req.params.id;

  try {
    Student.findOne({ uid })
      .then((existingStudent) => {
        if (existingStudent) {
          res.status(200).send({
            faculty: existingStudent.faculty,
            major: existingStudent.major,
          });
        } else {
          res.status(404).json({ error: 'User not found' });
        }
      })
      .catch((error) => {
        res
          .status(500)
          .json({ error: 'Failed to retrieve user from the database' });
      });
  } catch (ears) {}
});
module.exports = router;
