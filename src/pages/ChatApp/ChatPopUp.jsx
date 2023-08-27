import styled from 'styled-components';
import ConversationScreen from './ConversationScreen';
import SearchScreen from './SearchScreen';
import HomeScreen from './HomeScreen';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { setViewPanel } from './redux/ChatSlice';
import { SCREENS } from './redux/ChatSlice';
import FormScreen from './FormScreen';

const AbsoluteDiv = styled.div`
  position: fixed;
  right: 100px;
  top: calc(100vh - 400px); // 390 is the height of the panel
  z-index: 99999999999;
`;

const ChatFloatIconContainer = styled.div`
  position: fixed;
  right: 25px;
  top: calc(100vh - 100px);
  width: 50px;
  height: 50px;
  background-color: #002145;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
  z-index: 9999999;
`;

const ChatPopUp = () => {
  const screenName = useSelector((state) => state.ChatReducer.screen.name);
  const viewPanel = useSelector((state) => state.ChatReducer.viewPanel);
  const dispatch = useDispatch();
  return (
    <>
      {!viewPanel ? (
        <ChatFloatIconContainer onClick={() => dispatch(setViewPanel(true))}>
          <FontAwesomeIcon icon={faPaperPlane} size="xl" />
        </ChatFloatIconContainer>
      ) : (
        <AbsoluteDiv>
          {screenName === SCREENS.HOME ? <HomeScreen /> : ''}
          {screenName === SCREENS.FORM ? <FormScreen /> : ''}
          {screenName === SCREENS.CONVERSATION ? <ConversationScreen /> : ''}
          {screenName === SCREENS.SEARCH ? (
            <SearchScreen showPanel={true} />
          ) : (
            ''
          )}
        </AbsoluteDiv>
      )}
    </>
  );
};

export default ChatPopUp;
