var express = require('express');
var router = express.Router();
const { Student } = require('../database/model');

router.get('/searchName/:name', async (req, res) => {
  const { name } = req.params;

  try {
    const users = await Student.find(
      {
        preferredName: { $regex: name, $options: 'i' },
      },
      { preferredName: 1, image: 1, uid: 1, _id: 0 }
    );
    res.status(200).send(users);
  } catch (e) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/userInfo/:uid', async function (req, res, next) {
  const { uid } = req.params;

  try {
    const users = await Student.findOne(
      { uid: uid },
      { preferredName: 1, image: 1, _id: 0 }
    );

    res.status(200).send(users);
  } catch (e) {
    return res.status(500).json({ error: 'User not found' });
  }
});

module.exports = router;
