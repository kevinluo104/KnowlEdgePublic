import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AnnouncementList from './AnnouncementList';
import NavbarComponent from '../Components/Navbar';
import { getAnnouncementsAsync, removeAnnouncementAsync } from './redux/thunks';
import styled, { createGlobalStyle } from 'styled-components';
import { useParams } from 'react-router-dom';
import {
  fetchAllCoursesAsync,
  fetchStudentInfoAsync,
} from '../StudentDashboard/redux/thunks';
import AnnouncementPopUp from './AnnouncementPopUp';
// learnt how to use global style: https://react.school/styled-components
// learnt how to add and remove elements dynamically from Code Academy
// Citation for making elements appear and disappear on click: https://www.youtube.com/watch?v=uXk62ZgPH-4&ab_channel=Accessworld
// Citation for learning how to use and setup redux from https://github.com/danyakarras/react-redux-button-counter-2022
// Code inpsired from Workshop 3's cs455-express-demo repo: https://github.com/svmah/cs455-express-demo/tree/add-server
// dynamicSegmentValue learnt from ChatGPT
// Citation for popup: https://www.youtube.com/watch?v=i8fAO_zyFAM&ab_channel=TylerPotts

const GlobalStyle = createGlobalStyle`
body {
  background: #f9f9f9;
  }`;
const AnonuncementStyle = styled.div`
  .announcements-header {
    display: flex;
    padding: 25px 100px;
    justify-content: space-between;
  }

  .makeNewAnnouncement {
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    height: 40px;
    background: #0074d9;
    border-radius: 8px;
    font-weight: 600;
    font-size: medium;
    color: #ffffff;
    padding: 15px;
  }
  .formTitle {
    font-weight: 600;
    font-size: x-large;
    color: #221824;
  }
`;

export default function Announcement() {
  const allAnnouncements = useSelector(
    (state) => state.announcementPageReducerStore.announcements
  );
  const uid = useSelector((state) => state.user.currentUser.uid);
  const instructorBoolean = useSelector(
    (state) => state.user.currentUser.instructor
  );
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [announcements, setAnnouncements] = useState(allAnnouncements);

  const dispatch = useDispatch();
  const studentInfo = useSelector(
    (state) => state.studentDashboardReducer.studentInfo
  );
  const studentCourses = studentInfo.courses;

  const updatedStudentCourses = [];

  const { '*': dynamicSegmentValue } = useParams();
  useEffect(() => {
    if (uid) {
      dispatch(
        getAnnouncementsAsync({ uid: uid, course: dynamicSegmentValue })
      );
    }
    if (dynamicSegmentValue === 'all') {
      setShowAnnouncement(false);
    } else {
      setShowAnnouncement(true);
    }
  }, [dispatch, uid]);

  const handleDelete = (announcementId) => {
    dispatch(removeAnnouncementAsync({ uid: uid, id: announcementId }));
  };

  useEffect(() => {
    if (uid) {
      dispatch(fetchStudentInfoAsync(uid));
    }
  }, [dispatch, uid]);

  studentCourses?.forEach((course) =>
    updatedStudentCourses.push(
      (course.split(' ')[0] + '-' + course.split(' ')[1]).toLowerCase()
    )
  );

  return (
    <>
      <GlobalStyle></GlobalStyle>
      <AnonuncementStyle>
        <NavbarComponent></NavbarComponent>
        <div className="announcements-header">
          <h1 className="formTitle">Announcements</h1>
          {showAnnouncement && (
            <button
              type="button"
              onClick={() => setButtonPopup(true)}
              className={'makeNewAnnouncement'}
            >
              Post Announcement
            </button>
          )}
        </div>

        <AnnouncementList
          allAnnouncements={allAnnouncements}
          handleDelete={handleDelete}
          studentCourses={updatedStudentCourses}
          studentUid={uid}
          instructorBoolean={instructorBoolean}
        />
        <AnnouncementPopUp
          trigger={buttonPopup}
          setTrigger={setButtonPopup}
          studentUid={uid}
        ></AnnouncementPopUp>
      </AnonuncementStyle>
    </>
  );
}
