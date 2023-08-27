import React from 'react';
import { Navbar, Dropdown } from 'flowbite-react';
import logo from '../../assets/images/logo-white.png';
import name from '../../assets/images/name-white.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HomeScreen from '../ChatApp/HomeScreen';
import {
  faHouse,
  faClipboardList,
  faCalendarDays,
  faBook,
  faSquarePollVertical,
  faCommentDots,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import CourseEnrollement from './CourseEnrollement';
import { useSelector, useDispatch } from 'react-redux';
import { setEnrollModal } from '../StudentDashboard/redux/StudentDashboardSlice';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import ConversationScreen from '../ChatApp/ConversationScreen';
import ChatPopUp from '../ChatApp/ChatPopUp';

const CustomNavbarLink = styled(Navbar.Link)`
  font-family: 'Poppins';
  color: white;
  &:hover {
    color: #e5e8ec;
  }
`;

const CustomNavbar = styled(Navbar)`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.06);
  background-color: #002145;
  border-radius: 0;

  .logout-btn {
    color: white;
  }
`;

const CustomDiv = styled.div`
  position: relative;
`;

const NavbarComponent = ({ hideMessages }) => {
  const { showEnrollModal } = useSelector(
    (state) => state.studentDashboardReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('userToken');
      navigate('/signup'); // Redirect to the login page after signing out
    } catch (error) {
      console.log('Error signing out:', error);
    }
  };

  return (
    <CustomDiv>
      {showEnrollModal ? <CourseEnrollement /> : ''}

      {hideMessages ? '' : <ChatPopUp />}
      <CustomNavbar fluid>
        <Navbar.Brand href="/">
          <img alt="Logo" className="mr-3 h-6 sm:h-9" src={logo} />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            <img alt="KnowlEdge" className="mr-3 h-6 sm:h-9" src={name} />
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Navbar.Toggle />
        </div>
        <div className="flex md:order-2">
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <CustomNavbarLink href="/" className="font-sans font-bold">
            <span>
              <FontAwesomeIcon icon={faHouse} className="mr-2" />
              Dashboard
            </span>
          </CustomNavbarLink>
          <CustomNavbarLink className="font-sans font-bold">
            <Dropdown
              inline
              label={
                <span>
                  <FontAwesomeIcon icon={faClipboardList} className="mr-2" />
                  Courses
                </span>
              }
            >
              <Dropdown.Item onClick={() => dispatch(setEnrollModal('true'))}>
                Enroll
              </Dropdown.Item>
            </Dropdown>
          </CustomNavbarLink>

          <CustomNavbarLink className="font-sans font-bold">
            <Dropdown
              inline
              label={
                <span>
                  <FontAwesomeIcon icon={faCalendarDays} className="mr-2" />
                  Calendar
                </span>
              }
            >
              <Dropdown.Item>Inbox</Dropdown.Item>
              <Dropdown.Item onClick={() => navigate('/calendar')}>
                Event Calendar
              </Dropdown.Item>
            </Dropdown>
          </CustomNavbarLink>

          <CustomNavbarLink href="/messages" className="font-sans font-bold">
            <span>
              <FontAwesomeIcon icon={faCommentDots} className="mr-2" />
              Messages
            </span>
          </CustomNavbarLink>
          <CustomNavbarLink
            href=""
            onClick={handleSignOut}
            className="font-sans font-bold"
          >
            <span>
              <FontAwesomeIcon icon={faRightFromBracket} className="mr-2" />
              Log Out
            </span>
          </CustomNavbarLink>
        </Navbar.Collapse>
      </CustomNavbar>
    </CustomDiv>
  );
};

export default NavbarComponent;
