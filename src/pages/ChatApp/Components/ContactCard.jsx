import styled from 'styled-components';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';

const ContactCardStyled = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 5px;

  .image-container {
    border-radius: 50%;
    overflow: hidden;
    width: fit-content;
    display: flex;
    justify-content: center;
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }

  .content-container {
    flex: 1;
  }

  .name-and-time-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .name {
    font-size: medium;
    font-weight: 500;
    margin-bottom: 5px;
  }

  .last-message-time {
    font-size: small;
  }

  .last-message {
    font-size: x-small;
  }

  &:hover {
    background-color: #003366;
    border-radius: 15px;
    color: #f5f5f5;
  }
`;

const ContactCard = ({ name, image, lastMessage, onClick }) => {
  const relativeTime = lastMessage?.timestamp
    ? formatDistanceToNow(new Date(lastMessage?.timestamp), {
        addSuffix: false,
      })
    : '';
  const [imageURL, setImageURL] = useState(image);

  return (
    <ContactCardStyled onClick={onClick}>
      <div className="image-container">
        <img
          src={imageURL}
          onError={() => {
            setImageURL('https://freesvg.org/img/abstract-user-flat-4.png');
          }}
        />
      </div>
      <div className="content-container">
        <div className="name-and-time-wrapper">
          <h2 className="name">{name}</h2>
          <p className="last-message-time">{relativeTime}</p>
        </div>
        <p className="last-message">{lastMessage?.content}</p>
      </div>
    </ContactCardStyled>
  );
};

export default ContactCard;
