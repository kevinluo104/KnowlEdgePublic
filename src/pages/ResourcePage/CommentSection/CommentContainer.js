import { styled } from 'styled-components';
import React from 'react';
import CommentCard from './CommentCard';
import { fetchCommentsAsync } from '../redux/thunks';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const ReplyCommentsStyled = styled.div`
  margin-left: 52px;
  border-left: 3px solid #eaecf1;
`;

const CommentContainer = () => {
  const pageID = useSelector((state) => state.resourcePageReducer.pageID);
  const uid = useSelector((state) => state.user.currentUser.uid);
  const dispatch = useDispatch();
  useEffect(() => {
    if (pageID !== undefined && uid !== undefined) {
      dispatch(fetchCommentsAsync({ uid: uid, resourceID: pageID }));
    }
  }, [dispatch, pageID, uid]);

  const comments = useSelector((state) => state.resourcePageReducer.comments);

  return (
    <div className="comment-container">
      {comments.map((comment, index) => {
        return (
          <React.Fragment key={index}>
            <CommentCard comment={comment} />

            <ReplyCommentsStyled>
              {comment?.replies?.map((reply, replyIndex) => {
                const edittedReply = { ...reply, parent_id: comment._id };
                return (
                  <CommentCard
                    key={`${index}-${replyIndex}`}
                    comment={edittedReply}
                  />
                );
              })}
            </ReplyCommentsStyled>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default CommentContainer;
