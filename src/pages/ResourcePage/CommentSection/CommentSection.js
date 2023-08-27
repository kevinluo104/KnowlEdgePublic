import { styled } from 'styled-components';
import React from 'react';
import CommentContainer from './CommentContainer';
import CommentField from './CommentField';

const CommentSection = () => {
  return (
    <div
      style={{
        maxWidth: '50vw',
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
        margin: '0 auto',
      }}
    >
      <CommentField />
      <CommentContainer />
    </div>
  );
};

export default CommentSection;
