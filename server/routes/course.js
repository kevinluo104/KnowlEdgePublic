var express = require('express');
var router = express.Router();
const { Course } = require('../database/model');

// MAP UID TO STUDENT NAME (MAP UID TO STUDENT COLLECTION), DISPLAY STUDENT NAME, GET PICTURE SIDE BY SIDE

router.patch('/', async (req, res) => {
    const course = req.body.courses;
    const uid = req.body.uid;
   console.log("HEREEEE: " + JSON.stringify(req.body));
   console.log("COURSE: " + course);
        try {
            const updatedStudent = await Course.findOneAndUpdate(
                { courseName: course },
                { $push: { students: uid } },
                { new: true }
              );
              if (!updatedStudent) {
                // If updatedStudent is null, no matching course was found
                return res.status(404).json({ error: 'Course not found' });
              }
              console.log('ARRAY: ' + updatedStudent.students);

              const studentDetails = await Course.aggregate([  // FROM CHATGPT
                { $match: { courseName: course } }, // Filter by the courseName
                { $unwind: '$students' }, // Unwind the students array to create individual documents
                {
                  $lookup: {
                    from: 'students', // Collection name 'students'
                    localField: 'students',
                    foreignField: 'uid',
                    as: 'studentDetails',
                  },
                },
                { $unwind: '$studentDetails' }, // Unwind the studentDetails array to create individual documents
                {
                  $project: {
                    _id: 0,
                    preferredName: '$studentDetails.preferredName',
                    image: '$studentDetails.image',
                    contact: '$studentDetails.contact',
                    faculty: '$studentDetails.faculty',
                    major: '$studentDetails.major',
                  },
                },
              ]);
          
            //   console.log('Student Details:', studentDetails);
            return  res.status(200).send(studentDetails);
    } catch (error) {
    return  res.status(500).json({ error: 'Failed to retrieve user from the database' });
    }
});

router.delete('/', async (req, res) => {
    const course = req.body.courses;
    const uid = req.body.uid;
   console.log("HEREEEE: " + JSON.stringify(req.body));
   console.log("COURSE: " + course);
        try {
            
            await Course.findOneAndUpdate(
                { courseName: course },
                { $pull: { students: uid } },
              )
              console.log('hi');
             return res.status(200).send();
    } catch (error) {
    return  res.status(500).json({ error: 'Failed to retrieve user from the database' });
    }
});

router.get('/:courseTitle', async (req, res) => {
    console.log('Stu');
    const courseTitle = req.params.courseTitle;
    try {
    const result = await findCourseByPartialMatch(courseTitle);
  // console.log("RES: " + result);
  // console.log("NAME: " + result[0].courseName
   const courseName = result[0].courseName;

   const studentDetails = await Course.aggregate([  // FROM CHATGPT
   { $match: { courseName: courseName } }, // Filter by the courseName
   { $unwind: '$students' }, // Unwind the students array to create individual documents
   {
     $lookup: {
       from: 'students', // Collection name 'students'
       localField: 'students',
       foreignField: 'uid',
       as: 'studentDetails',
     },
   },
   { $unwind: '$studentDetails' }, // Unwind the studentDetails array to create individual documents
   {
     $project: {
       _id: 0,
       preferredName: '$studentDetails.preferredName',
       image: '$studentDetails.image',
       contact: '$studentDetails.contact',
       faculty: '$studentDetails.faculty',
       major: '$studentDetails.major',
     },
   },
 ]);
 console.log('Stu1');
 console.log('Student Details:', studentDetails);

    return res.status(200).send(studentDetails);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to retrieve user from the database' });
    }

})

async function findCourseByPartialMatch(substring) {
  try {
    // Create a regular expression pattern with the substring
    console.log("SUBSTIRNG: " + substring);
    const regexPattern = new RegExp(substring, 'i'); // 'i' for case-insensitive matching

    // Use the find method with the $regex operator
    const query = { courseName: { $regex: regexPattern } };

    const result = await Course.find(query);
   // console.log(result);
    return result;
  } catch (error) {
    console.error('Error occurred:', error);
    return null;
  }
}

module.exports = router;
