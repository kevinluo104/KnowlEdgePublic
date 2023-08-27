import { styled } from 'styled-components';
import CardGeneric from './CardGeneric';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';

import {
  faBuildingColumns,
  faCode,
  faUser,
  faGraduationCap,
} from '@fortawesome/free-solid-svg-icons';


const CardStyled = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  justify-content: space-between;
  height: 100%;
  background-color: #414656;
  color: white;
  border-radius: 5px;

  &:hover {
    cursor: default;
  }

  div {
    display: flex;
    width: 100%;
  }

  h2 {
    flex: 2;
    text-align: left;
    font-weight: 600;
  }

  span {
    width: 30px;
  }
`;

const InformationCard = CardGeneric(() => {
  const uid = useSelector((state) => state.user.currentUser.uid);
  const [faculty, setFaculty] = useState('');
  const [major, setMajor] = useState('');
  const [studentNumber, setStudentNumber] = useState('N/A');
  const instructorBoolean = useSelector((state) => state.user.currentUser.instructor);
  

  const setStudentInfo = async () => {
    if (uid) {
    const res = await axios.get(`http://localhost:3005/user/studentID/${uid}`);
    setFaculty(res.data.faculty);
    setMajor(res.data.major);
    setStudentNumber(uid.replace(/\D/g, ""));  // REMOVE NON-NUMBERS FROM STRING, FROM CHATGPT
  }

  }

  useEffect(() => {
    setStudentInfo();
  })

  return (
    <CardStyled>
      <div>
        <span>
          <FontAwesomeIcon icon={faBuildingColumns} />
        </span>
        <h2>Faculty of {faculty}</h2>
      </div>
      <div>
        <span>
          <FontAwesomeIcon icon={faCode} />
        </span>
        <h2>{major}</h2>
      </div>
      {!instructorBoolean? (
        <div>
        <span>
          <FontAwesomeIcon icon={faUser} />
        </span>
        <h2>{studentNumber}</h2>
      </div>
      ): 
      <div>
      <span>
        <FontAwesomeIcon icon={faUser} />
      </span>
      <h2>N/A</h2>
    </div>}
      
    {!instructorBoolean? (
        <div>
        <span>
          <FontAwesomeIcon icon={faGraduationCap} />
        </span>
        <h2>3rd Year Standing</h2>
      </div>
      ): 
      <div>
      <span>
        <FontAwesomeIcon icon={faUser} />
      </span>
      <h2>N/A</h2>
    </div>}
    
    </CardStyled>
  );
});

export default InformationCard;
