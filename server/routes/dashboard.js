var express = require('express');
var router = express.Router();
const { Course, Comment } = require('../database/model');
const ObjectId = require('mongoose').Types.ObjectId;
const admin = require('firebase-admin');

const serviceAccount = require('../knowledge-72d21-firebase-adminsdk-pc5sp-f043f98d9b.json');

router.get('/courses/all/:uid', async function (req, res, next) {
  try {
    const { uid } = req.params;
    const idToken = req.headers.authorization;
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const tokenUid = decodedToken.uid;

    if (tokenUid !== uid) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const courses = await Course.find();
    const courseNames = courses.map((course) => course.courseName);
    return res.status(200).json(courseNames);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/comments/:uid/:resourceId', async function (req, res, next) {
  const { resourceId } = req.params;
  try {
    const { uid } = req.params;
    const idToken = req.headers.authorization;
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const tokenUid = decodedToken.uid;

    if (uid !== tokenUid) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const comments = await Comment.findOneAndUpdate(
      {
        resourceId: resourceId,
      },
      {},
      { upsert: true, new: true, setDefaultsOnInsert: true }
    )

      .populate({
        path: 'comments.sender',
        model: 'User',
      })
      .populate({
        path: 'comments.replies.sender',
        model: 'User',
      })
      .populate({
        path: 'comments.replies.reply_to',
        model: 'User',
      })
      .lean();

    // Sort comments based on upvotes
    comments.comments.sort((a, b) => b.upvotes - a.upvotes);

    comments.comments.forEach((comment) => {
      comment.replies.sort((a, b) => b.upvotes - a.upvotes);
    });

    return res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/comments/:uid', async function (req, res, next) {
  const { resourceId, content, sender, reply_to } = req.body;

  const { uid } = req.params;
  const idToken = req.headers.authorization;
  const decodedToken = await admin.auth().verifyIdToken(idToken);
  const tokenUid = decodedToken.uid;

  if (tokenUid !== uid) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Check if any required variables are null
  if (!resourceId || !content || !sender) {
    return res.status(400).json({ error: 'Missing required data' });
  }

  const comment = {
    _id: new ObjectId(),
    content,
    sender,
    upvotes: 1,
    replies: [],
    reactions: [
      {
        user_id: sender,
        type: 'upvote',
        _id: new ObjectId(),
      },
    ],
  };

  try {
    let updatedComment;
    if (reply_to) {
      comment.reply_to = reply_to.person_id;

      const getAllComments = await Comment.findOne({
        resourceId: resourceId,
        'comments._id': new ObjectId(reply_to.comment_id),
      }).lean({ toJSON: { virtuals: true } });

      let allComments = getAllComments.comments;

      for (let i = 0; i < allComments.length; i++) {
        if (new ObjectId(reply_to.comment_id).equals(allComments[i]._id)) {
          if (!allComments[i].replies) {
            allComments[i].replies = [];
          }
          allComments[i].replies.push(comment);
          break;
        }
      }

      updatedComment = await Comment.findOneAndUpdate(
        { resourceId: resourceId },
        { $set: { comments: allComments } },
        { new: true }
      ).lean();
    } else {
      updatedComment = await Comment.findOneAndUpdate(
        { resourceId: resourceId },
        { $push: { comments: comment } },
        { new: true, upsert: true }
      ).lean();
    }

    await Comment.populate(updatedComment, {
      path: 'comments.sender',
      model: 'User',
    });

    await Comment.populate(updatedComment, {
      path: 'comments.replies.sender',
      model: 'User',
    });

    await Comment.populate(updatedComment, {
      path: 'comments.replies.reply_to',
      model: 'User',
    });

    updatedComment.comments.sort((a, b) => b.upvotes - a.upvotes);

    updatedComment.comments.forEach((comment) => {
      comment.replies.sort((a, b) => b.upvotes - a.upvotes);
    });

    return res.status(200).json(updatedComment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

function findCommentAndUpdateVotes(comments, specificID, reaction) {
  for (const comment of comments) {
    if (new ObjectId(comment._id).equals(specificID)) {
      const existingReaction = comment.reactions.find(
        (r) => r.user_id === reaction.user_id
      );

      if (existingReaction) {
        if (existingReaction.type === reaction.type) {
          comment.reactions = comment.reactions.filter(
            (r) => r.user_id !== reaction.user_id
          );
        } else {
          existingReaction.type = reaction.type;
        }
      } else {
        comment.reactions.push(reaction);
      }

      comment.upvotes = comment.reactions.reduce((acc, r) => {
        return acc + (r.type === 'upvote' ? 1 : -1);
      }, 0);

      return comment;
    }
    if (comment.replies && comment.replies.length > 0) {
      const foundComment = findCommentAndUpdateVotes(
        comment.replies,
        specificID,
        reaction
      );
      if (foundComment) {
        return foundComment;
      }
    }
  }
  return null;
}

router.put('/comments/:uid/:commentId', async function (req, res, next) {
  const { resourceId, reaction } = req.body;
  const { commentId } = req.params;
  const { uid } = req.params;

  const idToken = req.headers.authorization;
  const decodedToken = await admin.auth().verifyIdToken(idToken);
  const tokenUid = decodedToken.uid;

  if (uid !== tokenUid) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Check if any required variables are null
  if (!resourceId || !reaction) {
    return res.status(400).json({ error: 'Missing required data' });
  }

  try {
    const getAllComments = await Comment.findOne({
      resourceId: resourceId,
    }).lean({ toJSON: { virtuals: true } });

    const allComments = getAllComments.comments;
    findCommentAndUpdateVotes(allComments, commentId, reaction);

    updatedComment = await Comment.findOneAndUpdate(
      { resourceId: resourceId },
      { $set: { comments: allComments } },
      { new: true }
    ).lean();

    await Comment.populate(updatedComment, {
      path: 'comments.sender',
      model: 'User',
    });

    await Comment.populate(updatedComment, {
      path: 'comments.replies.sender',
      model: 'User',
    });

    await Comment.populate(updatedComment, {
      path: 'comments.replies.reply_to',
      model: 'User',
    });

    updatedComment.comments.sort((a, b) => b.upvotes - a.upvotes);

    updatedComment.comments.forEach((comment) => {
      comment.replies.sort((a, b) => b.upvotes - a.upvotes);
    });

    return res.status(200).json(updatedComment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
