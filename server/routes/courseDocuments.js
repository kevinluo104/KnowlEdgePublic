// FILE UPLOADING BY CHATGPT
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const port = 3005;
const fs = require("fs");
const { ImageModel, CourseDocuments } = require('../database/model');
const path = require('path');
var router = express.Router();
const dotenv = require('dotenv').config();
const fileUpload = require('express-fileupload');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.use(cors());
router.use(express.json());
router.use(express.static('public'));
router.use(fileUpload());
router.use('/courseDocuments', express.static(path.join(__dirname, 'uploads')));

  
  router.get('/file', (req, res) => {
    const uploadPath = path.join(__dirname, 'uploads');


  
    fs.readdir(uploadPath, (err, files) => {
      if (err) {
        return res.status(500).json({ error: 'Error reading files' });
      }
  
      if (files.length === 0) {
        return res.status(404).json({ error: 'No files found in the uploads folder' });
      }
      const courseTitle = req.query.courseTitle;
      const resourceName = req.query.resourceName;
     const filePath = path.join(uploadPath, courseTitle + '-' + resourceName + '.pdf');
     
      fs.readFile(filePath, (err, data) => { 
        if (err) {
          return res.status(500).json({ error: 'Error reading file content' });
        }
        res.setHeader('Content-Type', 'application/pdf');
        res.send(data);
      });
    });
  });

  router.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const file = req.files.file;
    const fileExtension = path.extname(file.name);
    const courseTitle = req.body.courseTitle;
    const resourceName = req.body.resourceName;
    const uploadPath = path.join(__dirname, 'uploads', courseTitle +  "-" + resourceName  + fileExtension);
  
  
    file.mv(uploadPath, (err) => { 
      if (err) {
        console.log(err);
        return res.status(500).json({ error: err });
      }
  
      res.json({ message: 'File uploaded successfully' });
    });
  });

  module.exports = router;