import React from 'react';
import { addModuleAsync } from './redux/thunks';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import styled from 'styled-components';

// Citation for making elements appear and disappear on click: https://www.youtube.com/watch?v=uXk62ZgPH-4&ab_channel=Accessworld
// learnt how to add and remove elements dynamically from Code Academy
export default function CourseModuleForm({setTrigger, course}) {
  const CourseModuleFormStyle = styled.div`
  .titleInput{
    position: absolute;
    margin: 5px;
    width: 90%;
    top: 30%;
    font: 15px;
  }

  .submitButton {
    position: absolute;

    padding: 5px;
    border: 0.1px rgb(192, 192, 192) solid;
    border-radius: 5px;
    background-color: blue;
    border-radius: 5px;
  
  
  background: #0074D9;
  border-radius: 10px;
  
  
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 30px;
  /* identical to box height */
  
  color: #FFFFFF;
  top: 70%;
  left: 88%;
  }
  `
    const [newModule, setNewModule] = useState({});
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(addModuleAsync(newModule));
        setTrigger(false);
        setNewModule({});
      };
    
      const handleChange = ({ target }) => {
        const { name, value } = target;
        setNewModule((prevModule) => ({ ...prevModule, moduleId: Date.now(), moduleCourse: course, [name]: value}));
      };

      
    return (
    <>
     
        <form onSubmit={handleSubmit}>
            <input
            name=  "moduleTitle"
            className= "titleInput"
            value = {newModule.moduleTitle}
            placeholder = " Module Title"
            onChange = {handleChange}
            />
          <CourseModuleFormStyle>

            <button type = "submit" className="submitButton">Submit</button>
            </CourseModuleFormStyle>
          </form > 

           
     </>
     );
};