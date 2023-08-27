import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faEllipsis,
  faMagnifyingGlass,
  faMaximize,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import ContactCard from '../Components/ContactCard';
import PanelGeneric from './PanelGeneric';

const MessageCardStyled = styled.div`
  /* The styles for the message cards are adopted from here: https://codepen.io/wesleymaik/pen/gOzOjxX*/
  .msg-text {
    margin-bottom: 15px;
    width: fit-content;
    font-size: 0.85em;

    animation: appear-msg ease 0.25s forwards;

    .text {
      display: block;
      padding: 0.75em;
      border-radius: 0.75em 0.75em 0.75em 0;
      background-color: #2186eb;
      box-shadow: 0 2px 0 #00000020;
      color: #f5f5f5;
    }

    &.owner {
      margin-left: auto;
      .text {
        color: black;
        background: #d9e2ec;
        border-radius: 0.75em 0.75em 0 0.75em;
      }
    }
  }

  p {
    font-size: small;

    &.owner,
    &:not(.channel) {
      display: none;
    }
  }
`;

const MessageCard = ({ message, isBySender, senderName, chatType }) => {
  return (
    <MessageCardStyled>
      <div className={`msg-text ${isBySender ? 'owner' : ''}`}>
        <span className="text">{message}</span>
        <p className={`sender-name ${isBySender ? 'owner' : ''} ${chatType}`}>
          {senderName}
        </p>
      </div>
    </MessageCardStyled>
  );
};

export default MessageCard;
