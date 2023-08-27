import styled from 'styled-components';
import HomeScreen from './HomeScreen';
import Navbar from '../Components/Navbar';
import ConversationScreen from './ConversationScreen';
import { SCREENS } from './redux/ChatSlice';
import { useSelector } from 'react-redux';
import SearchScreen from './SearchScreen';
import FormScreen from './FormScreen';

const PanelStyled = styled.div`
  min-height: 100vh;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .container {
    flex: 1;
    display: flex;
    flex-direction: row;
    width: 100vw;
    max-width: 100vw;
  }
  .left-window {
    width: 30%;
    background-color: #002145;
  }

  .right-window {
    width: 70%;
    background-color: #f0f4f8;
  }
`;

const LargePanel = () => {
  const screenName = useSelector((state) => state.ChatReducer.screen?.name);

  return (
    <PanelStyled>
      <Navbar hideMessages={true} />
      <div className="container">
        <div className="left-window">
          <HomeScreen />
        </div>

        <div className="right-window">
          {screenName === SCREENS.SEARCH ? <SearchScreen /> : ''}
          {screenName === SCREENS.CONVERSATION ? <ConversationScreen /> : ''}
          {screenName === SCREENS.FORM ? <FormScreen /> : ''}
        </div>
      </div>
    </PanelStyled>
  );
};

export default LargePanel;
