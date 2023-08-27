var express = require('express');
var router = express.Router();
const { CourseDocuments } = require('../database/model');
const ObjectId = require('mongoose').Types.ObjectId;
const admin = require('firebase-admin');

const serviceAccount = require('../knowledge-72d21-firebase-adminsdk-pc5sp-f043f98d9b.json');

router.get('/:uid/:courseIdentifier', async function (req, res, next) {
  const [firstPart, secondPart, thirdPart] =
    req.params.courseIdentifier.split('-');
  console.log(firstPart);

  console.log(secondPart + '-' + thirdPart);
  try {
    const idToken = req.headers.authorization;
    const { uid } = req.params;
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const tokenUid = decodedToken.uid;
    if (tokenUid !== uid) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const content = await CourseDocuments.find({
      pageType: firstPart,
      courseName: secondPart + '-' + thirdPart,
    }).then();
    return res.status(200).send(content[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
