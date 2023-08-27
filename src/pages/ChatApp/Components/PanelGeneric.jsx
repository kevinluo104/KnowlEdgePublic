import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setViewPanel, setViewModeIsSmall } from '../redux/ChatSlice';

const PanelStyled = styled.div`
  border-radius: 5px 5px 0 0;
  & > * {
    padding: 10px;
  }
`;

const PanelGeneric = ({ children, ...rest }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname === '/messages') {
      dispatch(setViewPanel(false));
      dispatch(setViewModeIsSmall(false));
    } else {
      dispatch(setViewModeIsSmall(true));
    }
  }, [location]);

  return (
    <PanelStyled as="div" {...rest}>
      {children}
    </PanelStyled>
  );
};

export default PanelGeneric;
