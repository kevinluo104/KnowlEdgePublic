// dynamicSegmentValue learnt from ChatGPT

import React, { useState, useEffect } from 'react';
import SmallCard from '../Components/SmallCard';
import NavbarComponent from '../Components/Navbar';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  getNotesAsync,
  getAnnouncementsAsync,
  getModuleAsync,
  removeModuleAsync,
  getStudySetsAsync
} from './redux/thunks';
import CourseModuleForm from './CourseModuleForm';
import ModuleList from './ModuleList';
import InstructorCoursePagePopup from './InstructorCoursePagePopup';
import styled from 'styled-components';
import GroupIcon from '@mui/icons-material/Groups';
import { useParams } from 'react-router-dom';

export default function CoursePage() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const allModules = useSelector((state) => state.coursePageReducer.modules);

  const uid = useSelector((state) => state.user.currentUser.uid);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const instructorBoolean = useSelector(
    (state) => state.user.currentUser.instructor
  );
  const { '*': dynamicSegmentValue } = useParams();

  const studySets = useSelector((state) => state.coursePageReducer.list);
  const filteredStudySet = []
  studySets.forEach((study) => (study.course? filteredStudySet.push(study): ""));
  const filteredFilteredStudySet = filteredStudySet.filter((study) => (study.course.split(" ")[0].toLowerCase() + "-" + study.course.split(" ")[1]) === dynamicSegmentValue);
  useEffect(() => {
    if (uid) {
      dispatch(
        getAnnouncementsAsync({ uid: uid, course: dynamicSegmentValue })
      );
      dispatch(getStudySetsAsync(uid));

      dispatch(getModuleAsync(dynamicSegmentValue));
      dispatch(getNotesAsync({ course: dynamicSegmentValue, notesUid: uid }));
    }
  }, [dispatch, uid]);

  useEffect(() => {
    console.log(instructorBoolean);
  }, [instructorBoolean]);

  const allAnnouncements = useSelector(
    (state) => state.coursePageReducer.announcements
  );

  const allNotes = useSelector((state) => state.coursePageReducer.notes);

  const StyleResource = styled.div`
    .classListButtonContainer {
      display: flex;
      justify-content: center;
    }

    .classListButtonContainer button {
      color: #000;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    .buttonFrame {
      display: inline-block;
      border: 2px solid #000;
      padding: 2px 4px;
      border-radius: 5px;
      transition: background-color 0.3s;
    }

    .buttonFrame:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  `;

  const CoursePage = styled.div`
    /* Citation for placing elements next to each other: https://stackoverflow.com/questions/33155170/three-centered-boxes-next-to-each-other-html */
    background-color: #f9f9f9;
    min-height: 100vh;

    .seeMoreLink {
      float: right;
      font-weight: bold;
      color: #221824;
    }

    .courseModules {
      display: flex;
      flex-direction: row;
      width: 100%;
      height: 75px;
      align-items: center;
      text-align: left;
      border: none;
      background-color: white;
      box-shadow: 1px 1px 4px 4px rgba(0, 0, 0, 0.06);
      margin-top: 20px;
      background-color: #ffffff;
      font-weight: 600;
      font-size: large;
      padding: 15px;
      border-radius: 5px;
      justify-content: space-between;
    }

    .learningModules {
      padding: 25px 100px;
      font-weight: 600;
      font-size: x-large;
      color: #221824;
    }

    .subModules {
      display: flex;
      flex-direction: row;
      width: 100%;
      align-items: center;
      text-align: left;
      background: #ffffff;
      border-width: 1px 1px 1px 1px;
      border-style: solid;
      border-color: rgba(194, 193, 193, 0.8);
      font-weight: 600;
      font-size: 20px;
      color: #000000;
      height: 55px;
      padding: 15px;
      border-radius: 0 0 5px 5px;
    }

    .courseTitle {
      font-weight: 600;
      font-size: x-large;
      align-items: center;
      color: #221824;
    }

    .icon-container {
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      background-color: #002145;
      color: #fff;
      margin-right: 15px;
    }

    .subModuleName {
      margin-left: 27px;
      font-size: large;
    }

    .subModuleIcon {
      margin-left: 12.5px;
    }

    .topComponentName {
      font-weight: 600;
      font-size: large;
      margin-bottom: 15px;
    }

    .course-page-header {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 25px 100px;
    }

    .card-container {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: space-between;
      max-width: 100%;
      padding: 25px 100px;
      gap: 20px;
    }

    .module-name-wrapper {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    .addModule {
      font-size: 15px;
      color: blue;
      text-decoration: underline;
    }
  `;

  const handleDelete = (moduleId) => {
    dispatch(removeModuleAsync(moduleId));
  };

  return (
    <CoursePage>
      <NavbarComponent />

      <div className="course-page-header">
        <h1 className="courseTitle">
          {' '}
          {'Courses > ' +
            dynamicSegmentValue.split('-')[0].toUpperCase() +
            ' ' +
            dynamicSegmentValue.split('-')[1]}
        </h1>
        <StyleResource>
          <div className="classListButtonContainer">
            <button
              onClick={() =>
                navigate(`/courses/${dynamicSegmentValue}/classList`)
              }
            >
              <span className="buttonFrame">
                <GroupIcon style={{ fontSize: '35px' }} />
                &nbsp;People
              </span>
            </button>
          </div>
        </StyleResource>
      </div>

      <div className="topComponents">
        <div className="card-container">
          <div>
            <h3 className="topComponentName">Study Sets</h3>
            {filteredFilteredStudySet.length >= 1 ? (
              <div    onClick={() =>
                navigate(`/studysets/course/${dynamicSegmentValue}`)
              }>
              <SmallCard type="study-set" title={filteredFilteredStudySet[0].title} />
              </div>
            ) : (
              <div    onClick={() =>
                navigate(`/studysets/course/${dynamicSegmentValue}`)
              }>
              <SmallCard type="none" title="" />
              </div>
            )}
            {filteredFilteredStudySet.length >= 2 ? (
              <div    onClick={() =>
                navigate(`/studysets/course/${dynamicSegmentValue}`)
              }>
              <SmallCard type="study-set" title={filteredFilteredStudySet[1].title} />
              </div>
            ) : (
              <div    onClick={() =>
                navigate(`/studysets/course/${dynamicSegmentValue}`)
              }>
              <SmallCard type="none" title="" />
              </div>
            )}
            <button
              className="seeMoreLink"
              onClick={() =>
                navigate(`/studysets/course/${dynamicSegmentValue}`)
              }
            >
              See more...
            </button>
          </div>

          <div>
            <h3 className="topComponentName">Notes</h3>
            {allNotes.length >= 1 ? (
              <div onClick={() => navigate('/notes/' + dynamicSegmentValue)}>
              <SmallCard type="notes" title={allNotes[0].noteTitle} />
              </div>
            ) : (
              <div onClick={() => navigate('/notes/' + dynamicSegmentValue)}>
              <SmallCard type="none" title="" />
              </div>
            )}
            {allNotes.length >= 2 ? (
              <div onClick={() => navigate('/notes/' + dynamicSegmentValue)}>
              <SmallCard type="notes" title={allNotes[1].noteTitle} />
              </div>
            ) : (
              <div onClick={() => navigate('/notes/' + dynamicSegmentValue)}>

              <SmallCard type="none" title="" />
              </div>
            )}
            <button
              className="seeMoreLink"
              onClick={() => navigate('/notes/' + dynamicSegmentValue)}
            >
              See more...
            </button>
          </div>

          <div>
            <h3 className="topComponentName">Announcements</h3>

            {allAnnouncements.length >= 1 ? (
              <div  onClick={() => navigate('/announcements/' + dynamicSegmentValue)}>
              <SmallCard
                type="announcement"
                title={allAnnouncements[0].announcementTitle}
              />
              </div>
            ) : (
              <div  onClick={() => navigate('/announcements/' + dynamicSegmentValue)}>
              <SmallCard type="none" title="" />
              </div>
            )}
            {allAnnouncements.length >= 2 ? (
              <div  onClick={() => navigate('/announcements/' + dynamicSegmentValue)}>
              <SmallCard
                type="announcement"
                title={allAnnouncements[1].announcementTitle}
              />
              </div>
            ) : (
              <div  onClick={() => navigate('/announcements/' + dynamicSegmentValue)}>

              <SmallCard type="none" title="" />
              </div>
            )}
            <button
              className="seeMoreLink"
              onClick={() => navigate('/announcements/' + dynamicSegmentValue)}
            >
              See more...
            </button>
          </div>
        </div>

        <div className="learningModules">
          <h2>Learning Modules</h2>
          <InstructorCoursePagePopup
            trigger={buttonPopup}
            setTrigger={setButtonPopup}
          >
            <CourseModuleForm
              setTrigger={setButtonPopup}
              course={dynamicSegmentValue}
            />
          </InstructorCoursePagePopup>
         { instructorBoolean &&
          <button
            onClick={() => setButtonPopup(!buttonPopup)}
            className="addModule"
          >
            {' '}
            Add Module{' '}
          </button>
}
          <ModuleList
            allModules={allModules}
            handleDelete={handleDelete}
            instructorBoolean={instructorBoolean}
          />
        </div>
      </div>
    </CoursePage>
  );
}
