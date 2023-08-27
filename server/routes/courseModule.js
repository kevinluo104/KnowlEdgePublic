var express = require('express');
var router = express.Router();
const { CourseModule, CourseSubmodule } = require('../database/model');

router.get('/:course', async function (req, res, next) {
  var modules = [];

  modules = await CourseModule.find({
    moduleCourse: req.params.course
  });

  res.status(200).send(modules);
})
router.post('/', async function (req, res, next) {
    const courseModuleToServer = new CourseModule(req.body);
    courseModuleToServer.save();
    res.status(201).send(req.body);
  });

  router.delete('/:course', async function (req, res, next) {
    CourseModule.findOneAndRemove({
      moduleId: Number(req.params.course),
    }).then((response) => {
      console.log(response);
    });

    CourseSubmodule.deleteMany({
      moduleId: Number(req.params.course)
    }).then((response) => {
      console.log(response);
    });
    res.status(204).send();
  })
  module.exports = router;