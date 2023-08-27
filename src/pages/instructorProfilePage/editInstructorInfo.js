import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
//import { useDispatch } from 'react-redux';
//import { editInstructorProfileAsync } from './thunks';

export default function EditInstructorInfo({ instructor, onSubmit }) {
  const [editedInstructor, setEditedInstructor] = useState(instructor);
  //const dispatch = useDispatch();

  useEffect(() => {
    // setEditedStudent((prevStudent) => ({ ...prevStudent, preferredName: '' }));
    setEditedInstructor((prevInstructor) => ({ ...prevInstructor, preferredName: '' }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedInstructor((prevInstructor) => ({
      ...prevInstructor,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('ERE' + editedInstructor.preferredName);
    // dispatch(editStudentProfileAsync(editedStudent));
    //  dispatch(getItemsAsync());
    //   setNewTask({ // clear form after add new item
    //     title: "",
    //     description: "",
    //     price: "",
    //     image: ""
    //   });
    //   dispatch(getItemsAsync(editedStudent));
    onSubmit(editedInstructor);
  };

  return (
    <form className="formContainer" onSubmit={handleSubmit}>
      <p style={{ fontSize: '20px' }}>
        <strong>Preferred Name:</strong>
      </p>

      <input
        type="text"
        id="preferredName"
        name="preferredName"
        value={editedInstructor.preferredName}
        onChange={handleChange}
        style={{ fontSize: 20 }}
      />

      <p style={{ fontSize: '20px' }}>
        <strong>Contact:</strong>
      </p>
      <input
        type="text"
        id="contact"
        name="contact"
        value={editedInstructor.contact}
        onChange={handleChange}
        style={{ fontSize: 20 }}
      />

      <p style={{ fontSize: '20px' }}>
        <strong>About Me:</strong>
      </p>
      <textarea
        id="aboutMe"
        name="aboutMe"
        value={editedInstructor.aboutMe}
        rows="5"
        cols="40"
        onChange={handleChange}
        style={{ fontSize: 20 }}
      />
      <Button
        variant="contained"
        type="submit"
        style={{ width: 150, height: 50, fontSize: 30 }}
      >
        Submit
      </Button>
    </form>
  );
}
