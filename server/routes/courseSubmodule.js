var express = require('express');
var router = express.Router();
const { CourseSubmodule } = require('../database/model');

router.get('/', async function (req, res, next) {
  var submodules = [];

  submodules = await CourseSubmodule.find({  });

  res.status(200).send(submodules);
})
router.post('/', async function (req, res, next) {
    const courseModuleToServer = new CourseSubmodule(req.body);
    courseModuleToServer.save();
    res.status(201).send(req.body);
  });

  router.delete('/:submoduleId', async function (req, res, next) {
    CourseSubmodule.findOneAndRemove({
      submoduleId: Number(req.params.submoduleId),
    }).then((response) => {
      console.log(response);
    });

    res.status(204).send();
  });
  
  module.exports = router;