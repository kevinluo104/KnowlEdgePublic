import { styled } from 'styled-components';
import CardGeneric from './CardGeneric';
import profile_image from '../../assets/profile_img.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  faPenToSquare,
  faBell,
  faGear,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { app } from '../../firebase';

const CardStyled = styled.div`
  width: 350px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 15px;

  &:hover {
    color: black;
  }

  div {
    width: 100%;
  }

  .rounded-container {
    border-radius: 50%;
    overflow: hidden;
    width: fit-content;
    display: flex;
    justify-content: center;
  }

  .flex-item {
    flex: auto;
  }

  .flex-1 {
    flex: 1;
  }

  .flex-2 {
    flex: 2;
  }

  img {
    width: 50px;
    height: 50px;
  }

  .img-container {
    display: flex;
    justify-content: center;
  }

  h2 {
    font-size: large;
    font-weight: bold;
    color: #414656;
  }

  .icons-container {
    display: flex;
    justify-content: space-around;
    padding: 3px;
  }

  .icon {
    cursor: pointer;
  }

  .icon:hover {
    color: #003366;
  }

  .margin-right {
    margin-right: 8px;
  }
`;

const StudentCard = CardGeneric(() => {
  const navigate = useNavigate();

  const instructorBoolean = useSelector(
    (state) => state.user.currentUser.instructor
  );

  const currentUser = useSelector((state) => state.user.currentUser);
  const userImage = useSelector(
    (state) => state.studentDashboardReducer.studentInfo.image
  );

  const profileImage = userImage ? (
    userImage
  ) : (
    <FontAwesomeIcon icon={faUser} />
  );

  return (
    <CardStyled>
      <div className="flex-item flex-1 img-container">
        <div className="rounded-container">
          <img src={profileImage}></img>
        </div>
      </div>
      <div className="flex-item flex-2">
        <h2>{currentUser.displayName}</h2>
      </div>
      <div className="flex-item flex-1 icons-container">
        <FontAwesomeIcon
          icon={faPenToSquare}
          className="icon"
          onClick={() => {
            navigate('/profile');
          }}
        />
        <FontAwesomeIcon
          icon={faBell}
          className="icon"
          onClick={() => navigate('/announcements/all')}
        />
      </div>
    </CardStyled>
  );
});

export default StudentCard;
