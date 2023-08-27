var express = require('express');
var router = express.Router();
const { TextResourceModel } = require('../database/model');


router.post('/', async (req, res) => {
    const { text, course } = req.body;
   console.log("HEREEEE: " + text);
   console.log("COURSE: " + course);
        try {
            const updatedTextResource = await TextResourceModel.findOneAndUpdate(
                { course: course },
                { $set: { text: text } },
                { new: true, upsert: true }
              );
              console.log("FFSDFSDFSD: " + updatedTextResource);
            return  res.status(200).send(updatedTextResource);
    } catch (error) {
        console.log(error);
    return  res.status(500).json({ error: 'Failed to retrieve user from the database' });
    }
});

router.get('/:course/:resourceName', async (req, res) => {
    const course = req.params.course;
    const resourceName = req.params.resourceName;
   const resourceTextIdentifier = `${course}-${resourceName}`;
   console.log("res: " + resourceName);
        try {
            const updatedTextResource = await TextResourceModel.findOne(
                { course: resourceTextIdentifier }, 'text');
              //  console.log("DSDFSDF", updatedTextResource.text);
              console.log("DF", updatedTextResource);
            return res.status(200).send(updatedTextResource);
    } catch (error) {
        console.log(error);
    return  res.status(500).json({ error: 'Failed to retrieve user from the database' });
    }
});




module.exports = router;
