import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditStudentInfo from './EditStudentInfo';
import { getStudentProfileForUserAsync } from './thunks';
import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import NavbarComponent from '../Components/Navbar';

export default function StudentProfile() {
  const StylingComp = styled.div`
    background-color: #f9f9f9;
    min-height: 100vh;

    .studentImage {
      width: 350px;
      border-radius: 50%;
      border: 0;
    }

    .profile-background {
      height: 220px;
      width: 100%;
      background: linear-gradient(90deg, #e49e71 9.33%, #d45f97 92.96%);
      background-blend-mode: darken;
      border-radius: 0px;
    }

    .profile-information {
      position: relative;
      height: 280px;
      background: #ffffff;
      border-radius: 0px 0px 10px 10px;
      padding: 0 100px;
      display: flex;
      flex-direction: row;
    }

    .img-container {
      position: relative;
      width: 150px;
      height: 150px;
      top: -75px;
      border-radius: 50%;
      background-color: #fff;
    }

    .nameField {
      position: relative;
      color: #221824;
      font-size: x-large;
      top: -50px;
    }

    #handle {
      font-size: medium;
    }

    .first-half {
      flex: 1;
      min-width: fit-content;
    }

    .second-half {
      flex: 2;
      margin-left: 450px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .info-text {
      padding: 10px;
      font-size: large;
    }

    .menu-icon {
      display: flex;
      position: relative;
      float: right;
      margin-bottom: 5px;
      justify-content: right;
      flex-direction: row;
    }

    .menu-icon:hover {
      color: #0074d9;
      cursor: pointer;
    }

    .edit-btn {
      position: absolute;
      top: 20px;
      border: 1px solid #221824;
      border-radius: 5px;
      padding: 10px;
      width: 70px;
      font-size: medium;
    }
    .about-me {
      display: flex;
      min-height: 180px;
      background: #ffffff;
      border-radius: 15px;
      padding: 25px 100px;
      display: flex;
      flex-direction: row;
      margin-top: 20px;
      flex-direction: column;
    }

    .about-me-header {
      color: #221824;
      font-size: x-large;
      font-weight: 600;
      margin-bottom: 10px;
    }

    .about-me-content {
      color: #221824;
      font-size: large;
    }
  `;

  const dispatch = useDispatch();
  const uid = useSelector((state) => state.user.currentUser.uid);
  const [showMenu, setShowMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const student = useSelector((state) => state.studentProfileReducer.student);
  const instructorBoolean = useSelector(
    (state) => state.user.currentUser.instructor
  );

  useEffect(() => {
    if (uid !== undefined) {
      // Add a conditional check to ensure uid is defined
      dispatch(getStudentProfileForUserAsync(uid));
    }
  }, [uid, dispatch]);

  return (
    <StylingComp>
      <NavbarComponent></NavbarComponent>
      <EditStudentInfo
        student={student}
        showModal={showEditModal}
        setShowModal={setShowEditModal}
      />
      <div className="profile-background"></div>
      <div className="profile-information">
        <div className="first-half">
          <div className="img-container">
            <img src={student.image} alt="Student" className="studentImage" />
          </div>
          <h1 className="nameField">
            <strong>{student.preferredName}</strong>
          </h1>
          <h1 className="nameField" id="handle">
            <strong>
              @{student.preferredName?.split(' ')[0].toLowerCase()}
            </strong>
          </h1>
        </div>
        <div className="second-half">
          <div
            className="menu-icon"
            onMouseEnter={() => setShowMenu(true)}
            onMouseLeave={() => setShowMenu(false)}
          >
            <FontAwesomeIcon icon={faEllipsisVertical} size="lg" />
            {showMenu ? (
              <button
                onClick={() => {
                  setShowMenu(false);
                  setShowEditModal(true);
                }}
                className="edit-btn"
              >
                Edit
              </button>
            ) : (
              ''
            )}
          </div>
          <h1 className="info-text">
            <strong>Faculty:</strong> {student.faculty}
          </h1>
          <br />
          <h1 className="info-text">
            {instructorBoolean ? (
              <div>
                <strong>Field:</strong> {student.major}
              </div>
            ) : (
              <div>
                <strong>Major:</strong> {student.major}
              </div>
            )}
          </h1>
          <br />
          <h1 className="info-text">
            <strong>Contact:</strong> {student.contact}
          </h1>
        </div>
      </div>

      <div className="about-me">
        <h1 className="about-me-header">About Me</h1>
        <p className="about-me-content">{student.aboutMe}</p>
      </div>
    </StylingComp>
  );
}
