var express = require('express');
var router = express.Router();
const { ImageModel } = require('../database/model');
const { ImagesearchRoller } = require('@mui/icons-material');
const multer = require('multer');
var bodyParser = require('body-parser')


router.post('/upload', async (req, res) => {

    const {base64, courseTitle, resourceName} = req.body;
    console.log("BASE", base64);
    console.log("COURS", courseTitle, resourceName);
    try {
        const filter = { course: `${courseTitle}-${resourceName}` };
        const update = { image: base64, course: `${courseTitle}-${resourceName}` };
        const options = { upsert: true, new: true }; // upsert and return the modified document
        const updatedDocument = await ImageModel.findOneAndUpdate(filter, update, options);
        res.send(updatedDocument);
    } catch (error) {
        res.send({Status: "error", data:error});
    }
});


router.get('/:courseTitle/:resourceName', async (req, res) => {
   
    try {
      const { courseTitle, resourceName } = req.params;
  
      const image = await ImageModel.find({ course: `${courseTitle}-${resourceName}` })
      .then (data => {
        res.send({status: "ok", data: data});
      })
    } catch (error) {
      console.error('Error fetching image:', error);
      res.status(500).json({ error: 'Failed to fetch image' });
    }
  });


module.exports = router;