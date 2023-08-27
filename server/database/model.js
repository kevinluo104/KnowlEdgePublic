const { kStringMaxLength } = require('buffer');
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    uid: { type: String, ref: 'User' },
    preferredName: String,
    faculty: String,
    major: String,
    contact: String,
    image: String,
    aboutMe: String,
    courses: [String],
  },
  { versionKey: false }
);

const instructorSchema = new mongoose.Schema(
  {
    uid: { type: String, ref: 'User' },
    preferredName: String,
    faculty: String,
    major: String,
    contact: String,
    image: String,
    aboutMe: String,
    courses: [String],
  },
  { versionKey: false }
);

const courseSchema = new mongoose.Schema(
  {
    courseName: String,
    students: [String],
  },
  { versionKey: false }
);

const commentSchema = new mongoose.Schema({
  resourceId: String,
  comments: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      content: String,
      sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      upvotes: Number,
      reactions: [
        {
          _id: mongoose.Schema.Types.ObjectId,
          user_id: String,
          type: {
            type: String,
          },
        },
      ],
      replies: [
        {
          content: String,
          sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
          reply_to: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
          upvotes: Number,
          reactions: [
            {
              user_id: String,
              type: {
                type: String,
              },
            },
          ],
        },
      ],
    },
  ],
});

const announcementSchema = new mongoose.Schema(
  {
    announcement: String,
    announcementId: Number,
    announcementTitle: String,
    announcementCourse: String,
    username: String,
    announcementStudentUid: String,
  },
  { versionKey: false }
);

const courseDocumentsSchema = new mongoose.Schema(
  {
    courseName: String,
    pageType: String,
    courseInformation: String,
  },
  { versionKey: false }
);

const Student = mongoose.model('Student', studentSchema);

const Instructor = mongoose.model('Instructor', instructorSchema);
const User = mongoose.model(
  'User',
  new mongoose.Schema({
    uid: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    displayName: { type: String, required: true },
    instructor: Boolean,
    employeeId: String,
  })
);

const Employee = mongoose.model(
  'Employee',
  new mongoose.Schema({
    employeeId: { type: String },
    firstName: { type: String },
    lastName: { type: String },
  })
);

const eventSchema = new mongoose.Schema(
  {
    uid: { type: String, ref: 'User' },
    title: String,
    start: String,
    end: String,
    location: String,
    links: [
      {
        name: String,
        url: String,
      },
    ],
    type: String,
    course: String,
    published: String,
    deadline: String,
    desc: String,
    course: String,
    completed: Boolean,
    published: Boolean,
    recurrence: {
      frequency: String,
      interval: Number,
      endRecurrence: String,
      completedInstances: [String],
    },
  },
  { versionKey: false }
);

const courseModuleSchema = new mongoose.Schema({
  moduleId: Number,
  moduleTitle: String,
  moduleCourse: String,
});

const courseSubmoduleSchema = new mongoose.Schema({
  submoduleId: Number,
  submoduleTitle: String,
  moduleId: Number,
});

const fileSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
});

const noteSchema = new mongoose.Schema({
  noteId: Number,
  noteTitle: String,
  noteParagraph: String,
  notesCourse: String,
  notesUid: String,
});

const imageSchema = new mongoose.Schema({
  image: String,
  course: String,
});

const textResourceSchema = new mongoose.Schema({
  text: String,
  course: String,
});

const mainModeSchema = new mongoose.Schema({
  course: String,
  mode: String,
});

const Event = mongoose.model('Event', eventSchema);

const Course = mongoose.model('Course', courseSchema);

const Comment = mongoose.model('Comment', commentSchema);

const Announcement = mongoose.model('Announcement', announcementSchema);

const CourseDocuments = mongoose.model('CourseDocument', courseDocumentsSchema);

const Note = mongoose.model('Note', noteSchema);

const CourseModule = mongoose.model('CourseModule', courseModuleSchema);

const CourseSubmodule = mongoose.model(
  'CourseSubmodule',
  courseSubmoduleSchema
);

const Mode = mongoose.model('MainMode', mainModeSchema);

//const File = mongoose.model('File', fileSchema);

const ImageModel = mongoose.model('Image', imageSchema);

const TextResourceModel = mongoose.model('TextResource', textResourceSchema);

module.exports = {
  Student,
  Course,
  Comment,
  User,
  Announcement,
  CourseDocuments,
  Instructor,
  Event,
  Note,
  CourseModule,
  CourseSubmodule,
  Employee,
  TextResourceModel,
  ImageModel,
  Mode,
};
