/* This code is adapted from:
1. https://www.flowbite-react.com/docs/components/modal
2. https://flowbite.com/docs/forms/input-field/
*/

import { Button, Modal } from 'flowbite-react';
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setEnrollModal } from '../StudentDashboard/redux/StudentDashboardSlice';
import { ListGroup } from 'flowbite-react';
import styled from 'styled-components';
import {
  fetchAllCoursesAsync,
  patchStudentCoursesAsync,
  fetchStudentInfoAsync,
} from '../StudentDashboard/redux/thunks';
import {
  addStudentToCourseAsync,
  deleteStudentFromCourseAsync,
} from '../StudentDashboard/redux/thunks';

const StyleListGroupItem = styled(ListGroup.Item)`
  button:hover {
    color: #002145;
  }
  button:focus {
    background-color: #002145;
    outline: none;
    color: white;
    --tw-ring-opacity: 0;
  }
  button:focus-visible {
    outline: none;
  }
`;

const CourseDivStyled = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;

  h3 {
    margin-right: 10px;
  }

  button {
    background-color: white;
    color: black;
    border: 1px solid #002145;
    border-radius: 5px;
    padding: 0 3px;
  }

  button:hover {
    background-color: #002145;
    color: white;
  }
`;

const CourseEnrollement = () => {
  const [searchContent, setSearchContent] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const rootRef = useRef(null);
  const inputRef = useRef(null);
  const currentUser = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();

  const studentCourses = useSelector(
    (state) => state.studentDashboardReducer.studentInfo.courses
  );

  useEffect(() => {
    if (studentCourses === undefined && currentUser.uid) {
      dispatch(fetchStudentInfoAsync(currentUser.uid));
    }
  }, [dispatch, studentCourses]);

  const allCourses = useSelector(
    (state) => state.studentDashboardReducer.allCourses
  );
  const handleInputChange = (event) => {
    setSearchContent(event.target.value);
    findCourse();
  };

  useEffect(() => {
    dispatch(fetchAllCoursesAsync(currentUser.uid));
  }, []);

  const findCourse = () => {
    const matchingCourses = allCourses.filter((course) => {
      return (
        course.toLowerCase().includes(searchContent.toLowerCase()) &&
        !studentCourses?.includes(course)
      );
    });

    setSearchResult(matchingCourses);
  };

  const openModal = useSelector(
    (state) => state.studentDashboardReducer.showEnrollModal
  );

  const setOpenModal = (payload) => {
    dispatch(setEnrollModal(payload));
  };

  const handleSelectItem = (event) => {
    setSearchContent('');
    inputRef.current.value = '';

    const courseToAdd = event.target.textContent;

    if (!studentCourses?.includes(courseToAdd)) {
      const updatedCourses = [...studentCourses, courseToAdd];
      dispatch(
        patchStudentCoursesAsync(
          { uid: currentUser.uid, updatedCourses },
          Date.now()
        )
      );
      dispatch(
        addStudentToCourseAsync({ uid: currentUser.uid, course: courseToAdd })
      );
    }

    setSearchResult([]);
  };

  const handleUnselectCourse = (event) => {
    event.preventDefault();
    try {
      const course = event.target.parentNode.childNodes[1].textContent;

      const updatedCourses = studentCourses?.filter((c) => c !== course);
      dispatch(
        patchStudentCoursesAsync(
          { uid: currentUser.uid, updatedCourses },
          Date.now()
        )
      );
      dispatch(
        deleteStudentFromCourseAsync({ uid: currentUser.uid, course: course })
      );
    } catch (e) {
      console.log("can't remove course");
    }
  };

  useEffect(() => {
    inputRef?.current?.focus();
  }, [inputRef.current]);

  return (
    <div ref={rootRef}>
      <Modal
        dismissible
        show={openModal === 'true'}
        root={rootRef.current ?? undefined}
        onClose={() => setOpenModal(undefined)}
      >
        <Modal.Header>Enroll in a course</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <form className="flex flex-col">
              <div>
                <label htmlFor="simple-search" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <input
                    autoComplete="off"
                    ref={inputRef}
                    type="text"
                    id="simple-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                {searchResult.length > 0 && searchContent && (
                  <ListGroup id="custom-list-item">
                    {searchResult.slice(0, 4).map((result, index) => {
                      return (
                        <StyleListGroupItem
                          key={index}
                          onClick={(e) => handleSelectItem(e)}
                        >
                          {result}
                        </StyleListGroupItem>
                      );
                    })}
                  </ListGroup>
                )}
              </div>

              <div>
                {studentCourses?.map((course, index) => {
                  return (
                    <CourseDivStyled key={index}>
                      <h3>{course}</h3>
                      <button onClick={(e) => handleUnselectCourse(e)}>
                        x
                      </button>
                    </CourseDivStyled>
                  );
                })}
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-end">
          <Button color="gray" onClick={() => setOpenModal(undefined)}>
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CourseEnrollement;
