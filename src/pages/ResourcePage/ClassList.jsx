import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getCourseStudentListAsync } from './redux/thunks';
import NavbarComponent from '../Components/Navbar';
import styled from 'styled-components';

// CHATGPT FOR STYLING
const StyleResource = styled.div` 
.student {
    display: flex;
    align-items: center;
    background-color: #f0f0f0;
    padding: 10px;
    border-bottom: 1px solid #ccc; 
  }

  .student img {
    width: 50px; 
    height: 50px;
    border-radius: 50%; 
    margin-right: 10px; 
  }

  .student h2 {
    font-weight: bold;
  }

  .courseTitle {
    /* Courses > CPSC 310 */

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 32px;
    line-height: 48px;

    color: #373537;

    margin: 20px;
  }
`;


const ClassList = () => {
  // useEffect(() => {
  //     dispatch(getClassListAsync(resourceName + '-' + courseTitle));
  //     window.scrollTo(0, 0); // Scroll to the top of the page
  //   }, [location.pathname]);

  const classList = useSelector((state) => state.classListReducer.classlist);

 // console.log('FGFGFD: ' + JSON.stringify(classList));
  const { courseTitle } = useParams();

 // console.log('DYANMIC: ' + courseTitle);

  const formattedString = courseTitle
    .toUpperCase()
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCourseStudentListAsync(formattedString));
    console.log('HFHHFD');
  }, []);

  console.log(formattedString);

  return (
    <StyleResource>
      <div>
        <NavbarComponent></NavbarComponent>
        <h1 className="courseTitle" style={{fontSize: "32px", fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: "600",
    lineHeight: "48px",
    color: "#373537",
    margin: "10px",
    }}>
          {' '}
          {'Course > ' + formattedString + ' > People'}
        </h1>
        <div className="students-list">
          {classList.map((item, index) => (
            <div key={index} className="student">
              <img src={item.image} alt={item.preferredName} />
              <div className="student-details">
                <h2>Name:</h2>
                <p>{item.preferredName}</p>
                <h2>Major:</h2>
                <p>{item.major}</p>
                <h2>Faculty:</h2>
                <p>{item.faculty}</p>
                <h2>Email:</h2>
                <p>{item.contact}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StyleResource>
  );
};

export default ClassList;
