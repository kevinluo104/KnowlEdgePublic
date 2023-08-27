import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editStudentProfileForUserAsync } from './thunks';
import { styled } from 'styled-components';
import { Button, Modal } from 'flowbite-react';

export default function EditStudentInfo({ student, showModal, setShowModal }) {
  const [editedStudent, setEditedStudent] = useState(student);
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.user.currentUser.uid);
  const rootRef = useRef(null);
  const inputRef = useRef(null);
  const [faculty, setFaculty] = useState('');
  const facultyList = ['Applied Science', 'Arts', 'Business', 'Education', 'Forestry', 'Kinesiology', 'Medicine', 'Law', 'Music', 'Nursing', 'Science'];

  const handleFacultyOption = (event) => {
    const newFaculty = event.target.value; // Get the new faculty value
  setFaculty(newFaculty); // Update the faculty state
  setEditedStudent((prevStudent) => ({
    ...prevStudent,
    faculty: newFaculty, // Use the newFaculty value here
  }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(false);
    dispatch(
      editStudentProfileForUserAsync({
        uid: uid,
        student: {
          uid: uid,
          student: editedStudent,
        },
      })
    );
  };

  const ButtonStyled = styled(Button)`
    background-color: #0074d9;

    &:hover {
      background-color: #007499;
    }
  `;

  return (
    <>
      <div ref={rootRef}>
        <Modal
          dismissible
          show={showModal === true}
          root={rootRef.current ?? undefined}
          onClose={() => setShowModal(false)}
        >
          <Modal.Header>Edit profile</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <form className="flex flex-col">
                <div>
                  <label className="sr-only">preferredName</label>
                  <div className="relative w-full mb-4">
                    <input
                      autoComplete="off"
                      ref={inputRef}
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-21  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Preferred Name"
                      name="preferredName"
                      value={editedStudent.preferredName}
                      onChange={handleChange}
                    />
                  </div>

                  <label className="sr-only">Contact</label>
                  <div className="relative w-full mb-4">
                    <input
                      autoComplete="off"
                      ref={inputRef}
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-21  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Contact"
                      name="contact"
                      value={editedStudent.contact}
                      onChange={handleChange}
                    />
                  </div>

                  <label className="sr-only">About Me</label>
                  <div className="relative w-full mb-4">
                    <textarea
                      autoComplete="off"
                      ref={inputRef}
                      type="text"
                      className="h-40 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-21  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="About me"
                      name="aboutMe"
                      value={editedStudent.aboutMe}
                      onChange={handleChange}
                    />
                  </div>

                  <label className="sr-only">Major</label>
                  <div className="relative w-full mb-4">
                    <input
                      autoComplete="off"
                      ref={inputRef}
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-21  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Major"
                      name="major"
                      value={editedStudent.major}
                      onChange={handleChange}
                    />
                  </div>
                  <label htmlFor="dropdown">Faculty:</label>
      <select id="dropdown" value={faculty} onChange={handleFacultyOption}>
        {facultyList.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
  
                </div>
              </form>
            </div>
          </Modal.Body>
          <Modal.Footer className="flex justify-end">
            <ButtonStyled className="save-btn" onClick={(e) => handleSubmit(e)}>
              Save
            </ButtonStyled>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
