import NavbarComponent from '../Components/Navbar';
import StudentCard from '../Components/StudentCard';
import InformationCard from '../Components/InformationCard';
import CourseCard from '../Components/CourseCard';
import SmallCard from '../Components/SmallCard';
import { styled } from 'styled-components';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { app } from '../../firebase';
import { useState, useEffect } from 'react';
import { fetchStudentInfoAsync } from './redux/thunks';
import { useSelector, useDispatch } from 'react-redux';
import WeatherDisplay from './WeatherDisplay';
import Clock from './Clock';
// used chatGPT to debug studentCourses.length not working and to change studentCourses.length to studentCourses?.length
// used chatGPT to figure out how to modify smallcard to navigate to pages without modifying the smallcard component and instead adding a div wrapper for handling clicks
const DashboardStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-wrap: wrap;
  background-color: #f9f9f9;
  .card-container {
    display: flex;

    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
    max-width: 100%;
    padding: 25px 100px;
    gap: 20px;
  }

  .column-container {
    padding: 0px 100px;
  }

  .text-align-left {
    text-align: left;
  }

  .greeting {
    font-weight: 600;
    font-size: x-large;
    display: flex;
    align-items: center;
    color: #221824;
  }

  .section-titles {
    font-weight: 600;
    font-size: large;
    margin-bottom: 15px;
  }

  #no-margin {
    margin-bottom: 0px;
  }

  #hidden {
    visibility: hidden;
  }

  .information-container {
    display: flex;
    flex-direction: column;
  }

  .information-wrapper {
    display: flex;
    height: 100%;
    margin-bottom: 20px;
  }

  .no-btm-padding {
    padding-bottom: 0;
  }

  .less-top-padding {
    padding-top: 15px;
  }
`;

const StudentDashboard = () => {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    if (currentUser.uid) {
      dispatch(fetchStudentInfoAsync(currentUser.uid));
    }
  }, [currentUser, dispatch]);

  const studentInfo = useSelector(
    (state) => state.studentDashboardReducer.studentInfo
  );

  const [studentCourses, setStudentCourses] = useState([]);

  useEffect(() => {
    setStudentCourses(studentInfo.courses);
  }, [studentInfo]);

  const handleCourseCardClick = (courseTitle) => {
    navigate(`/courses/${courseTitle}`);
  };

  const submitFile = () => {
    navigate(`/upload`);
  };


  const handleNoteCardClick = (courseTitle) => {
    console.log(courseTitle);
    const courses = courseTitle.toLowerCase().split(" ");
    navigate(`/notes/` + courses[0] + "-" + courses[1]);
  };

  const handleStudySetCardClick = (courseTitle) => {
    console.log(courseTitle);
    const courses = courseTitle.toLowerCase().split(" ");
    navigate(`/studysets/course/` + courses[0] + "-" + courses[1]);
  };
  return (
    <>
      <NavbarComponent />
      {/* <WeatherDisplay /> */}
    
     
      <DashboardStyled>
        <div className="card-container no-btm-padding">
          <h2 className="greeting">
            Welcome {currentUser.displayName}&nbsp;&nbsp;&nbsp;👋🏻
          </h2>

          <div style = {{marginLeft: "50px"}}><Clock /></div>

       

          <div>
            <StudentCard />
          </div>
        </div>
        <div className="card-container text-align-left">
          <div>
            <h3 className="section-titles">Study Sets</h3>
            {studentCourses?.length >= 1 ? (
                  <div      onClick = {() => handleStudySetCardClick(studentCourses[0].split(" - ")[0])}>
              <SmallCard
                type="study-set"
                title={studentCourses[0].split(" - ")[0] + " Study Sets"}
           
              />
              </div>
            ) : (
              <SmallCard type="none" title="" />
            )}
            {studentCourses?.length >= 2 ? (
              <div   onClick = {() => handleStudySetCardClick(studentCourses[1].split(" - ")[0])}>
              <SmallCard
                type="study-set"
                title={studentCourses[1].split(" - ")[0] + " Study Sets"}
              />
              </div>
            ) : (
              <SmallCard type="none" title="" />
            )}
          </div>
          <div>
            <h3 className="section-titles">Notes</h3>
                 {studentCourses?.length >= 1 ? (
                  <div      onClick = {() => handleNoteCardClick(studentCourses[0].split(" - ")[0])}>
              <SmallCard
                type="notes"
                title={studentCourses[0].split(" - ")[0] + " Notes"}
           
              />
              </div>
            ) : (
              <SmallCard type="none" title="" />
            )}
            {studentCourses?.length >= 2 ? (
              <div   onClick = {() => handleNoteCardClick(studentCourses[1].split(" - ")[0])}>
              <SmallCard
                type="notes"
                title={studentCourses[1].split(" - ")[0] + " Notes"}
              />
              </div>
            ) : (
              <SmallCard type="none" title="" />
            )}
          </div>
          <div className="information-container">
            <h3 className="section-titles" id="hidden">
              Notes
            </h3>
            <div className="information-wrapper">
              <InformationCard />
            </div>
          </div>
        </div>
        <div>
          <div className="column-container text-align-left">
            <h3 className="section-titles" id="no-margin">
              Courses
            </h3>
          </div>
          <div className="card-container less-top-padding">
            {studentCourses?.map((course) => {
              const [courseCode] = course.split(' - ');
              return (
                <CourseCard
                  key={courseCode}
                  title={course}
                  onclickfn={handleCourseCardClick}
                />
              );
            })}
          </div>
        </div>
      </DashboardStyled>
    </>
  );
};

export default StudentDashboard;
