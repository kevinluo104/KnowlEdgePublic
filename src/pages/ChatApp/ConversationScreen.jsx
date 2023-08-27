import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faEllipsisVertical,
  faMaximize,
  faPaperPlane,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import PanelGeneric from './Components/PanelGeneric';
import MessageCard from './Components/MessageCard';
import { SCREENS } from './redux/ChatSlice';
import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setScreen, setViewPanel } from './redux/ChatSlice';
import { sendNewMessageAsync } from './redux/ChatThunks';
import {
  subscribeToChatMessages,
  manageChatParticipation,
} from './redux/ChatService';
import { updateMessages } from './redux/ChatSlice';
import { useNavigate } from 'react-router-dom';
import { Button } from 'flowbite-react';

const PanelStyled = styled(PanelGeneric)`
  display: flex;
  flex-direction: column;
  height: 93.1vh;
  background-color: #f0f4f8;
  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    cursor: pointer;
  }

  .heading-container {
    display: flex;
    align-items: center;
  }

  .heading {
    margin-left: 5px;
    font-size: medium;
    font-weight: 600;
  }

  .icons-container {
    display: flex;
    width: 90px;
    justify-content: space-around;
    align-items: center;
    position: relative;
  }

  .options-menu {
    position: absolute;
    height: 75px;
    width: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: small;
    top: 20px;
    right: 45px;
    border-radius: 10px;
    display: none;
    background-color: #002145;
    color: white;
  }

  .leave-chat-btn {
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .leave-chat-btn:hover {
    background-color: #003366;
    border-radius: 10px;
  }

  .menu-container:hover .options-menu {
    display: block;
  }

  .break-line {
    padding: 0;
  }

  .conversation-container {
    padding-right: 15px;
  }

  /* The following is adapted from ChatGPT */
  .conversation-container-wrapper {
    max-height: 100%;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    scroll-behavior: smooth;
    flex: 1;
  }

  .conversation-container {
    padding-bottom: 50px;
    min-height: 255px;
  }

  .typing-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    padding: 10px;
    border-radius: 0;
    height: 70px;
    margin: 5px 0 0px 0;
  }

  .join-confirmation-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    padding: 10px;
    border-radius: 0;
    margin: 5px 0 0px 0;
  }

  .confirmation-text {
    font-size: medium;
    padding: 10px;
  }

  .typing-field {
    width: 95%;
    resize: none;
    border: none;
    font-size: small;
    height: 100%;
  }

  textarea:focus {
    border: none;
    outline: none;
  }

  .typing-field:focus {
    box-shadow: none;
  }
  .send-btn {
    align-items: center;
    display: flex;
    height: 100%;
    cursor: pointer;
  }
`;

const ButtonStyled = styled(Button)`
  background-color: #002145;
  width: fit-content;

  &:hover {
    background-color: #003366;
  }
`;

const ConversationScreen = () => {
  const currentUser = useSelector((state) => state.user.currentUser.uid);
  const contactName = useSelector(
    (state) => state.ChatReducer.screen?.contactName
  );
  const chatID = useSelector((state) => state.ChatReducer.screen?.chatID);
  const chatType = useSelector((state) => state.ChatReducer.screen?.chatType);
  const isJoined = useSelector((state) => state.ChatReducer.screen?.joined);
  const messagesList = useSelector(
    (state) => state.ChatReducer.messagesList[chatID]
  );
  const viewModeIsSmall = useSelector(
    (state) => state.ChatReducer.viewModeIsSmall
  );
  const dimensions = viewModeIsSmall ? { width: '350px', height: '400px' } : '';
  const dispatch = useDispatch();
  const conversationContainerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (chatID) {
      subscribeToChatMessages(chatID, (data) => {
        return dispatch(updateMessages({ chatID, data }));
      });
    }
  }, [chatID, dispatch]);

  useEffect(() => {
    if (conversationContainerRef.current) {
      const container = conversationContainerRef.current;
      container.scrollTop = container.scrollHeight;
    }
  }, [messagesList]);

  const handleSendMessage = (event) => {
    if (
      event.currentTarget.type === 'textarea' &&
      event.key === 'Enter' &&
      !event.shiftKey
    ) {
      event.preventDefault();
      const newMessage = event.currentTarget.value;
      if (newMessage.trim() !== '') {
        dispatch(
          sendNewMessageAsync({
            chatID: chatID,
            content: newMessage,
            sender_id: currentUser,
          })
        );
      }
      event.currentTarget.value = '';
    } else if (event.currentTarget.type === 'submit') {
      const newMessage = event.currentTarget.previousElementSibling.value;

      if (newMessage.trim() !== '') {
        dispatch(
          sendNewMessageAsync({
            chatID: chatID,
            content: newMessage,
            sender_id: currentUser,
          })
        );
      }
      event.currentTarget.previousElementSibling.value = '';
    }
  };

  return (
    <PanelStyled style={{ width: dimensions.width, height: dimensions.height }}>
      <div className="header">
        <div
          className="heading-container"
          onClick={() => {
            dispatch(setScreen({ name: SCREENS.HOME }));
          }}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
          <h1 className="heading">{contactName}</h1>
        </div>
        <div className="icons-container">
          <div className="menu-container">
            <FontAwesomeIcon
              className="icon"
              icon={faEllipsisVertical}
              size="lg"
            />
            <div className="options-menu">
              <button
                className="leave-chat-btn"
                onClick={() => {
                  manageChatParticipation(chatID, currentUser, 'leave');
                  dispatch(
                    setScreen({
                      name: SCREENS.HOME,
                    })
                  );
                }}
              >
                Leave chat
              </button>
            </div>
          </div>
          {viewModeIsSmall && (
            <FontAwesomeIcon
              icon={faMaximize}
              onClick={() => {
                navigate('/messages');
              }}
            />
          )}
          {viewModeIsSmall && (
            <FontAwesomeIcon
              icon={faXmark}
              size="lg"
              onClick={() => {
                dispatch(setViewPanel(false));
              }}
            />
          )}
        </div>
      </div>
      <div className="break-line"></div>
      <div
        ref={conversationContainerRef}
        className="conversation-container-wrapper"
      >
        <div className="conversation-container">
          {messagesList?.map((message, index) => (
            <MessageCard
              key={index}
              message={message.content}
              isBySender={message.sender_id === currentUser}
              senderName={message.senderName}
              chatType={chatType}
            />
          ))}
        </div>
      </div>

      {isJoined === false ? (
        <div className="join-confirmation-container">
          <h2 className="confirmation-text">
            Do you want to join this channel?
          </h2>
          <ButtonStyled
            onClick={() => {
              manageChatParticipation(chatID, currentUser, 'join');
              dispatch(
                setScreen({
                  name: SCREENS.CONVERSATION,
                  contactName: contactName,
                  chatID: chatID,
                  chatType: 'channel',
                })
              );
            }}
          >
            Join
          </ButtonStyled>
        </div>
      ) : (
        <div className="typing-container">
          <textarea
            className="typing-field"
            placeholder="Type..."
            onKeyDown={(e) => handleSendMessage(e)}
          ></textarea>
          <button
            className="send-btn"
            onClick={(e) => {
              handleSendMessage(e);
            }}
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      )}
    </PanelStyled>
  );
};

export default ConversationScreen;
