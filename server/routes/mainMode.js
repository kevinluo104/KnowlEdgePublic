var express = require('express');
var router = express.Router();
const { Mode } = require('../database/model');


router.post('/', async (req, res) => {
    const { mode, course } = req.body;
   console.log("HEREEEE: " + mode);
   console.log("COURSE: " + course);
        try {
            const updatedTextResource = await Mode.findOneAndUpdate(
                { course: course },
                { $set: { mode: mode } },
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
   console.log("HEQWRWQRQ");
        try {
            const updatedTextResource = await Mode.findOne(
                { course: resourceTextIdentifier }, 'mode');
              //  console.log("DSDFSDF", updatedTextResource.text);
              console.log("DF", updatedTextResource);
            return res.status(200).send(updatedTextResource);
    } catch (error) {
        console.log(error);
    return  res.status(500).json({ error: 'Failed to retrieve user from the database' });
    }
});




module.exports = router;
