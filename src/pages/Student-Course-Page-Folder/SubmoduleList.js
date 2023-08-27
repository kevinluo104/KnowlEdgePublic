import React from 'react';
import { faFileLines, faSquareMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

// Search filter citation: https://www.youtube.com/watch?v=MY6ZZIn93V8&ab_channel=LamaDev
// Citation for drop down: https://www.w3schools.com/howto/howto_css_dropdown.asp
// learnt how to add and remove elements dynamically from Code Academy

// styling for dynamically elements inspired from codeacademy
// Styling also imported from Figma
// Drop down menu citation for CSS: https://www.w3schools.com/howto/howto_css_dropdown.asp

const SubModuleListStyle = styled.div`
  .deleteSubmoduleButton {
    right: -98%;
    top: -1000000%;
    color: red;
  }
  .deleteSubmoduleButton:hover {
    color: gray;
  }

  .subModulesButton {
    background: #ffffff;

    width: 95%;

    /* position: relative; */
    /* Topic 1 for SLDC */

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 36px;
    /* identical to box height */
    text-align: left;
    color: #000000;
  }
`;
export default function SubmoduleList({
  moduleId,
  allSubmodules,
  handleSubmoduleDelete,
  instructorBoolean,
}) {
  const { '*': dynamicSegmentValue } = useParams();

  const handleCourseCardClick = (courseTitle) => {
    navigate(`${dynamicSegmentValue}/resource/${courseTitle}`);
  };

  const filteredSubmodules = allSubmodules.filter(
    (submodule) => submodule.moduleId === moduleId
  );
  const navigate = useNavigate();

  return (
    <SubModuleListStyle>
      <ul>
        {filteredSubmodules.map(({ submoduleId, submoduleTitle }) => (
          <li key={submoduleId}>
            <div className="subModules">
              <button
                className="subModulesButton"
                onClick={() => handleCourseCardClick(submoduleTitle)}
              >
                <FontAwesomeIcon
                  icon={faFileLines}
                  className="subModuleIcon"
                ></FontAwesomeIcon>
                <p className="courseIntroduction">{submoduleTitle}</p>
              </button>

              {instructorBoolean && (
                <button
                  onClick={() => handleSubmoduleDelete(submoduleId)}
                  className="deleteSubmoduleButton"
                >
                  {' '}
                  <FontAwesomeIcon icon={faSquareMinus}></FontAwesomeIcon>{' '}
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </SubModuleListStyle>
  );
}
