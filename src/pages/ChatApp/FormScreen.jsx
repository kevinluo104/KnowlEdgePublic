import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faMaximize,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import PanelGeneric from './Components/PanelGeneric';
import { SCREENS } from './redux/ChatSlice';
import { useSelector, useDispatch } from 'react-redux';
import { setScreen, setViewPanel } from './redux/ChatSlice';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'flowbite-react';
import { createNewChannel } from './redux/ChatService';

const PanelStyled = styled(PanelGeneric)`
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
  }

  .break-line {
    padding: 0;
  }

  .form-wrapper {
    max-height: 100%;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    scroll-behavior: smooth;
    flex: 1;
  }

  .form-container {
    display: flex;
    flex-direction: column;
  }

  .icon {
    cursor: pointer;
  }
`;

const ButtonStyled = styled(Button)`
  background-color: #002145;
  width: fit-content;
  align-self: end;
  margin-bottom: 60px;

  &:hover {
    background-color: #003366;
  }
`;

const FormScreen = () => {
  const currentUser = useSelector((state) => state.user.currentUser.uid);
  const dispatch = useDispatch();
  const viewModeIsSmall = useSelector(
    (state) => state.ChatReducer.viewModeIsSmall
  );
  const dimensions = viewModeIsSmall ? { width: '350px', height: '400px' } : '';
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

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
          <h1 className="heading">Create channel</h1>
        </div>
        <div className="icons-container">
          {viewModeIsSmall && (
            <FontAwesomeIcon
              className="icon"
              icon={faMaximize}
              onClick={() => {
                navigate('/messages');
              }}
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
      <div className="form-wrapper">
        <div className="form-container">
          <label htmlFor="channel-title" className="sr-only">
            Channel Title
          </label>
          <div>
            <input
              autoComplete="off"
              type="text"
              className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-21  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Channel Title"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </div>

          <label htmlFor="channel-image" className="sr-only">
            Channel Image URL
          </label>
          <div>
            <input
              autoComplete="off"
              type="text"
              className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-21  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Channel Image URL"
              onChange={(event) => {
                setImage(event.target.value);
              }}
            />
          </div>

          <label className="sr-only">Channel Description</label>
          <div className="relative w-full mb-4">
            <textarea
              autoComplete="off"
              type="text"
              className="mb-1 h-40 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-21  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Channel Description"
              name="description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <ButtonStyled
            onClick={() => {
              createNewChannel(title, image, description, currentUser);
              dispatch(setScreen({ name: SCREENS.HOME }));
            }}
          >
            Create
          </ButtonStyled>
        </div>
      </div>
    </PanelStyled>
  );
};

export default FormScreen;
