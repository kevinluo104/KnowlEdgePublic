import React, { useState, useEffect } from 'react';
import {
  faClipboard,
  faPlus,
  faTrash,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CourseSubmoduleForm from './CourseSubmoduleForm';
import SubmoduleList from './SubmoduleList';
import { useSelector, useDispatch } from 'react-redux';
import {
  addSubmoduleAsync,
  getSubmoduleAsync,
  removeSubmoduleAsync,
} from './redux/thunks';

// Search filter citation: https://www.youtube.com/watch?v=MY6ZZIn93V8&ab_channel=LamaDev
// Citation for drop down: https://www.w3schools.com/howto/howto_css_dropdown.asp
// learnt how to add and remove elements dynamically from Code Academy
// Citation for rotating Chevron (mainly took inspiration to use state to control Chevron's rotation): https://stackoverflow.com/questions/62835987/react-rotate-chevron-on-click
// styling for dynamically elements inspired from codeacademy
// Styling also imported from Figma
// Drop down menu citation for CSS: https://www.w3schools.com/howto/howto_css_dropdown.asp
// Used chatGPT to figure out how to create a list within a list
// Used chatGPT to figure out how to make each module details (the submodules) become visible or invisible upon clicking the individual modules
// Used ChatGPT to figure out how to make each chevron independently flip 180 degrees rotation upon clicking each module
import SubmodulePopup from './SubmodulePopup';
import styled from 'styled-components';

const ModuleListStyle = styled.div`
  .makeNewAnnouncement {
    /* Group 87 */
    right: 4%;
    top: 8%;
    position: absolute;

    /* Rectangle 78 */

    position: absolute;
    width: 180px;
    height: 40px;

    background: #0074d9;
    border-radius: 10px;

    /* Post announcement */

    position: absolute;

    margin: 0px;

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 30px;
    /* identical to box height */

    color: #ffffff;
  }

  .studySets {
    display: inline-block;
    width: 30%;
    height: 300px;
    background-color: white;
    margin: 30px;
    /* border: 0.5px gray solid; */
    position: relative;
  }

  .notes {
    display: inline-block;
    width: 30%;
    height: 300px;
    background-color: white;
    margin: 30px;
    /* border: 0.5px gray solid; */
    position: relative;
  }

  .announcement {
    display: inline-block;
    width: 30%;
    height: 300px;
    background-color: white;
    margin: 30px;
    /* border: 0.5px gray solid; */
    position: relative;
  }

  .seeMoreLink {
    position: absolute;
    right: 5%;
    bottom: 20%;
    font-weight: bold;
  }

  .topComponents {
    width: 100%;
  }

  .innerComponent {
    width: 100%;
    height: 20%;
    /* From Figma */
    background: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  .innerText {
    margin: 10px;
    font-size: 20px;
  }


  .courseModules {
    width: 95%;
    height: 75px;
    text-align: left;
    border: none;
    background-color: white;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    position: relative;
    /* Rectangle 34 */
    margin-top: 20px;
    display: inline-block;
    background: #ffffff;
    box-shadow: 1px 1px 4px 4px rgba(0, 0, 0, 0.06);

    /* Module 1 - Testing */

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 36px;

    color: #000000;
    cursor: pointer;
  }

  .learningModules {
    /* Learning Modules */

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 25px;
    line-height: 38px;

    color: #221824;
  }

  .subModules {
    /* Rectangle 41 */
    background: #ffffff;
    border-width: 0px 1px 1px 1px;
    border-style: solid;
    border-color: rgba(194, 193, 193, 0.8);
    width: 95%;

    /* position: relative; */
    /* Topic 1 for SLDC */

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 36px;
    /* identical to box height */

    color: #000000;
  }

  .moduleImages {
    width: 40px;
    margin-left: 10px;
    top: 20%;
    position: absolute;
  }

  .moduleName {
    position: absolute;
    left: 3.5%;
    bottom: -6%;
    margin-left: 1px;
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

  .moduleIcon {
    margin-left: 1%;
    display: inline;
  }

  .courseIntroduction {
    margin-left: 1%;
    display: inline;
  }

  .subModuleName {
    margin-left: 1%;
    display: inline;
  }

  .subModuleIcon {
    margin-left: 1%;
    display: inline;
  }

  .topComponentName {
    /* Study Sets */

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 25px;
    line-height: 38px;

    color: #221824;
  }

  .submoduleButton {
    position: absolute;
    color: blue;
    right: 100px;
  }

  .deleteModuleButton {
    position: absolute;
    color: red;
    right: 55px;


  }

`;
export default function ModuleList({
  allModules,
  handleDelete,
  instructorBoolean,
}) {
  const [newSubmodule, setNewSubmodule] = useState({});
  const [showModules, setShowModules] = useState(
    allModules.map(({ moduleId }) => ({
      moduleId,
      isVisible: false,
      rotation: 0,
    }))
  );
  const allSubmodules = useSelector(
    (state) => state.coursePageReducer.submodules
  );
  const [buttonPopup, setButtonPopup] = useState(false);
  const [chevronRotate, setChevronRotate] = useState(0);
  const [currentModuleId, setCurrentModuleId] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSubmoduleAsync());
  }, [dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addSubmoduleAsync(newSubmodule));
    setButtonPopup(false);
    setNewSubmodule({});
  };

  const handleChange =
    (moduleId) =>
    ({ target }) => {
      const { name, value } = target;
      setNewSubmodule((prevSubmodule) => ({
        ...prevSubmodule,
        submoduleId: Date.now(),
        [name]: value,
        moduleId: moduleId,
      }));
    };

  const handleButtonClick = (moduleId) => {
    setButtonPopup(true);
    setCurrentModuleId(moduleId);
  };

  const handleModuleClick = (moduleId) => {
    setShowModules((prevShowModules) => {
      const updatedShowModules = prevShowModules.map((module) =>
        module.moduleId === moduleId
          ? {
              ...module,
              isVisible: !module.isVisible,
              rotation: module.isVisible ? 0 : 180,
            }
          : module
      );

      return updatedShowModules;
    });
  };

  const handleSubmoduleDelete = (submoduleId) => {
    dispatch(removeSubmoduleAsync(submoduleId));
  };

  console.log('is instructor?', instructorBoolean);
  return (
    <ModuleListStyle>
      <ul className={'module-list'}>
        {allModules.map(({ moduleId, moduleTitle }) => (
          <li key={moduleId}>
            <>
              <div
                className="courseModules"
                onClick={() => handleModuleClick(moduleId)}

              >
                <div className="module-name-wrapper">
                  <span className="icon-container">
                    <FontAwesomeIcon icon={faClipboard}></FontAwesomeIcon>
                  </span>{' '}
                  <p className="courseIntroduction">{moduleTitle}</p>
                </div>
                {instructorBoolean && (
                  <button
                    type="button"
                    onClick={() => handleButtonClick(moduleId)}
                    className={'submoduleButton'}
                  >
                    {' '}
                    <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>{' '}
                  </button>
                )}
                {instructorBoolean && (
                  <button
                    onClick={() => handleDelete(moduleId)}
                    className="deleteModuleButton"
                  >
                    {' '}
                    <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>{' '}
                  </button>
                )}
                <FontAwesomeIcon
                  icon={faChevronUp}
                  rotation={
                    showModules.find((module) => module.moduleId === moduleId)
                      ?.rotation
                  }
                ></FontAwesomeIcon>
                <SubmodulePopup
                  trigger={buttonPopup}
                  setTrigger={setButtonPopup}
                >
                  <CourseSubmoduleForm
                    key={currentModuleId}
                    newSubmodule={newSubmodule}
                    handleChange={handleChange(currentModuleId)}
                    handleSubmit={handleSubmit}
                  />
                </SubmodulePopup>
              </div>

              {showModules.find((module) => module.moduleId === moduleId)
                ?.isVisible && (
                <SubmoduleList
                  moduleId={moduleId}
                  allSubmodules={allSubmodules}
                  handleSubmoduleDelete={handleSubmoduleDelete}
                  instructorBoolean={instructorBoolean}
                />

              )}
            </>
          </li>
        ))}
      </ul>
    </ModuleListStyle>
  );
}
