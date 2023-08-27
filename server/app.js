var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var studentProfileRouter = require('./routes/studentProfile');
var announcementRouter = require('./routes/announcement');
var noteRouter = require('./routes/note');
var eventRouter = require('./routes/event');
var userRouter = require('./routes/user');
var dashboardRouter = require('./routes/dashboard');

var courseContentRouter = require('./routes/courseContent');
var instructorProfileRouter = require('./routes/instructorProfile');
var courseRouter = require('./routes/course');
var textResourceRouter = require('./routes/textResource');
var courseDocumentsRouter = require('./routes/courseDocuments');
var imageResourceRouter = require('./routes/imageResource');
var courseModuleRouter = require('./routes/courseModule');
var courseSubmoduleRouter = require('./routes/courseSubmodule');
var weatherRouter = require('./routes/weather');
var chatRouter = require('./routes/chat');
var mainModeRouter = require('./routes/mainMode');
var employeeRouter = require('./routes/employee');

var app = express();
const db = require('./database/db');
var cors = require('cors');

var bodyParser = require('body-parser');
app.use(logger('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  express.json({
    limit: '20mb',
  })
);

app.use('/', indexRouter);
app.use('/studentProfile', studentProfileRouter);
app.use('/announcements', announcementRouter);
app.use('/user', userRouter);
app.use('/events', eventRouter);
app.use('/dashboard', dashboardRouter);
app.use('/resource', courseContentRouter);
app.use('/instructorProfile', instructorProfileRouter);
app.use('/courseDocuments', courseDocumentsRouter);
app.use('/text', textResourceRouter);
app.use('/image', imageResourceRouter);
app.use('/weather', weatherRouter);
app.use('/course', courseRouter);
app.use('/note', noteRouter);
app.use('/courseSubmodule', courseSubmoduleRouter);
app.use('/courseModule', courseModuleRouter);
app.use('/chat', chatRouter);
app.use('/mainMode', mainModeRouter);
app.use('/employees', employeeRouter);

module.exports = app;
