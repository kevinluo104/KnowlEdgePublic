var express = require('express');
var router = express.Router();
const { Employee } = require('../database/model');

router.get('/', (req, res) => {
  Employee.find()
    .then((employees) => {
      res.status(200).send(employees);
    })
    .catch((error) => {
      res.status(404).json({ error: 'Failed to retrieve events' });
    });
});

module.exports = router;
