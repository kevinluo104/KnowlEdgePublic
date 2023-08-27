import React from 'react';
import styled from 'styled-components';

// Citation for making elements appear and disappear on click: https://www.youtube.com/watch?v=uXk62ZgPH-4&ab_channel=Accessworld
// learnt how to add and remove elements dynamically from Code Academy
export default function CourseSubmoduleForm({newSubmodule, handleChange, handleSubmit}) {
    const CourseModuleFormStyle = styled.button`

  
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

    `;

    return (
     <>
        <form onSubmit={handleSubmit}>
            <input
            name=  "submoduleTitle"
            className= {"titleInput"}
            value = {newSubmodule.submoduleTitle}
            placeholder = "Title"
            onChange = {handleChange}
            />



<button type = "submit" className="submitButton">Submit</button>
          </form > 
   
</>
     );
};