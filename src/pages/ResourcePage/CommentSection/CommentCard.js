import { styled } from 'styled-components';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDown,
  faAngleUp,
  faCircleUser,
  faReply,
} from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { addReplyTo } from '../redux/ResourcePageSlice';
import { patchUpvotesAsync } from '../redux/thunks';

const CommentCardStyled = styled.div`
  padding: 25px;
  display: flex;
  flex-direction: row;
  cursor: default;

  .votes-container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 20px;
  }

  .vote-icon {
    cursor: pointer;
  }

  .comment-header {
    display: flex;
    flex-direction: row;
    margin: 15px 0;
    justify-content: space-between;
  }

  .flex-div {
    display: flex;
    align-items: center;
  }

  .span-style {
    margin-left: 10px;
    font-weight: bold;
  }

  .reply-div {
    cursor: pointer;
  }

  .content-container {
    flex: 1;
  }

  .reply-to {
    color: #0074d9;
    margin-right: 5px;
    font-weight: bold;
  }

  .upvotes-counter {
    width: 30px;
    text-align: center;
    font-weight: 600;
    margin: 10px 0;
  }

  .vote-icon {
    text-align: center;
    font-weight: bold;
  }

  .hover-button:hover {
    color: #0074d9;
    cursor: pointer;
  }
`;

const CommentCard = ({ comment }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [userReactionType, setUserReactionType] = useState(null);

  const dispatch = useDispatch();

  const pageID = useSelector((state) => state.resourcePageReducer.pageID);

  const handleReplyButton = () => {
    const reply_to_comment_id = comment.parent_id
      ? comment.parent_id
      : comment._id;
    dispatch(
      addReplyTo({
        uid: currentUser.uid,
        reply: {
          person_id: comment.sender._id,
          person_name: comment.sender.displayName,
          comment_id: reply_to_comment_id,
        },
      })
    );
  };

  const handleUpvoteChange = (change) => {
    if (pageID !== undefined && currentUser.uid) {
      dispatch(
        patchUpvotesAsync({
          uid: currentUser.uid,
          data: {
            resourceId: pageID,
            commentId: comment._id,
            reaction: {
              user_id: currentUser._id,
              type: change,
            },
          },
        })
      );
    }
  };

  useEffect(() => {
    if (currentUser) {
      const reaction = comment.reactions.find(
        (reaction) => reaction.user_id === currentUser._id
      );

      setUserReactionType(reaction ? reaction.type : null);
    }
  }, [dispatch, comment.reactions, currentUser, comment]);

  return (
    <CommentCardStyled>
      <div className="votes-container">
        <FontAwesomeIcon
          icon={faAngleUp}
          className="vote-icon hover-button"
          style={userReactionType === 'upvote' ? { color: '#0074d9' } : {}}
          onClick={() => handleUpvoteChange('upvote')}
        />
        <span className="upvotes-counter">{comment.upvotes}</span>
        <FontAwesomeIcon
          icon={faAngleDown}
          className="vote-icon hover-button"
          style={userReactionType === 'downvote' ? { color: '#0074d9' } : {}}
          onClick={() => handleUpvoteChange('downvote')}
        />
      </div>
      <div className="content-container">
        <div className="comment-header">
          <div className="commenter-details flex-div">
            <FontAwesomeIcon
              className="student-icon"
              icon={faCircleUser}
              size="lg"
            />
            <span className="span-style">
              {comment?.sender?.displayName
                ? comment?.sender?.displayName
                : 'Removed'}
            </span>
          </div>
          <button
            className="flex-div reply-div hover-button"
            onClick={handleReplyButton}
          >
            <FontAwesomeIcon icon={faReply} />
            <span className="span-style">Reply</span>
          </button>
        </div>
        <div className="comment">
          {comment.reply_to ? (
            <span className="reply-to">{`@${comment.reply_to.displayName}`}</span>
          ) : (
            ''
          )}
          {comment.content}
        </div>
      </div>
    </CommentCardStyled>
  );
};

export default CommentCard;
