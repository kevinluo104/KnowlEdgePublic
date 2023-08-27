var express = require('express');
var router = express.Router();
const { Note } = require('../database/model');
// https://www.freecodecamp.org/news/introduction-to-mongoose-for-mongodb-d2a7aa593c57/ citation for removing and updating resources

router.post('/', async function (req, res, next) {

    const noteToServer = new Note(req.body);
    noteToServer.save();
    res.status(201).send(req.body);
  });

router.put('/:id', async function (req, res, next) {
    const updateNote = await Note.findOneAndUpdate(
        {
            noteId: req.params.id
        },
        {
            noteTitle: req.body.noteTitle
        },
        {
            new: true,
        }
    );
        res.status(200).send(updateNote);
})

router.patch('/:id', async function (req, res, next) {
    const updateNote = await Note.findOneAndUpdate(
        {
            noteId: req.params.id
        },
        {
            noteParagraph: req.body.noteParagraph
        },
        {
            new: true,
        }
    );
        res.status(200).send(updateNote);
})

router.get('/:course/:notesUid', async function (req, res, next) {
    var notes = await Note.find({
        notesCourse: req.params.course,
        notesUid: req.params.notesUid

      });
    
    res.status(200).send(notes);
  });

  router.delete('/:id', function (req, res, next) {

    Note.findOneAndRemove({
          noteId: Number(req.params.id),
        })
      .then((response) => {
        console.log(response);
      });
    res.status(204).send();
  });
module.exports = router;
