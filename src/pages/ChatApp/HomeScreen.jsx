import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsisVertical,
  faMagnifyingGlass,
  faMaximize,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import ContactCard from './Components/ContactCard';
import PanelGeneric from './Components/PanelGeneric';
import { SCREENS } from './redux/ChatSlice';
import { useSelector, useDispatch } from 'react-redux';
import { setScreen, setViewPanel, updateChats } from './redux/ChatSlice';
import { useEffect } from 'react';
import { subscribeToChats } from './redux/ChatService';
import { useNavigate } from 'react-router-dom';

const PanelStyled = styled(PanelGeneric)`
  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .heading {
    font-size: large;
    font-weight: 600;
  }

  .icons-container {
    display: flex;
    width: 110px;
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
    right: 86px;
    border-radius: 10px;
    display: none;
  }

  .create-channel-btn {
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .create-channel-btn:hover {
    background-color: #003366;
    border-radius: 10px;
    color: white;
  }

  .menu-container:hover .options-menu {
    display: block;
  }

  .break-line {
    padding: 0;
  }

  /* The following is adapted from ChatGPT */
  .contact-cards-container-wrapper {
    max-height: 100%;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
  }

  .contact-cards-container {
    padding-bottom: 50px;
  }

  .icon {
    cursor: pointer;
  }
`;

const HomeScreen = () => {
  const chatsList = useSelector((state) => state.ChatReducer.chats);
  const viewModeIsSmall = useSelector(
    (state) => state.ChatReducer.viewModeIsSmall
  );
  const styles = viewModeIsSmall
    ? { width: '350px', height: '400px', backgroundColor: '#f0f4f8' }
    : { backgroundColor: '#002145', color: '#f5f5f5' };

  const optionMenuStyles = viewModeIsSmall
    ? { backgroundColor: '#002145', color: 'white' }
    : { backgroundColor: '#f0f4f8', color: 'black' };
  const currentUser = useSelector((state) => state.user.currentUser.uid);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      subscribeToChats(currentUser, (result) => {
        return dispatch(updateChats(result));
      });
    }
  }, [currentUser, dispatch]);

  return (
    <PanelStyled style={styles}>
      <div className="header">
        <h1 className="heading">Chats</h1>
        <div className="icons-container">
          <div className="menu-container">
            <FontAwesomeIcon
              className="icon"
              icon={faEllipsisVertical}
              size="lg"
            />
            <div className="options-menu" style={optionMenuStyles}>
              <button
                className="create-channel-btn"
                onClick={() => {
                  dispatch(setScreen({ name: SCREENS.FORM }));
                }}
              >
                Create channel
              </button>
            </div>
          </div>

          <FontAwesomeIcon
            onClick={() => {
              dispatch(setScreen({ name: SCREENS.SEARCH }));
            }}
            className="icon"
            icon={faMagnifyingGlass}
          />
          {viewModeIsSmall && (
            <FontAwesomeIcon
              onClick={() => {
                navigate('/messages');
              }}
              className="icon"
              icon={faMaximize}
            />
          )}
          {viewModeIsSmall && (
            <FontAwesomeIcon
              className="icon"
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
      <div className="contact-cards-container-wrapper">
        <div className="contact-cards-container">
          {chatsList.map((chat) => (
            <ContactCard
              key={chat.chatID}
              name={chat.chatName}
              image={chat.chatImage}
              lastMessage={chat?.lastMessage}
              onClick={() => {
                dispatch(
                  setScreen({
                    name: SCREENS.CONVERSATION,
                    contactName: chat.chatName,
                    chatID: chat.chatID,
                    chatType: chat.chatType,
                  })
                );
              }}
            />
          ))}
        </div>
      </div>
    </PanelStyled>
  );
};

export default HomeScreen;
