import React from 'react'
import styled from 'styled-components';
// citation for line: https://stackoverflow.com/questions/40697231/horizontal-line-in-the-middle-of-divs
const PopupStyle = styled.div`
.popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.2);

    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;

}

.popup-inner {
    position:relative;
    padding: 32px;
    width: 50%;
    max-width: 1200px;
    background-color: #FFF;
    height: 30%;
    /* Rectangle 100 */


background: #FFFFFF;
border-radius: 15px;

}

.closebtn {
    position: absolute;
    right: 5%;
    top: 5%;
}

.line {
    position: absolute;
    border-top: 1px solid lightgray;
    background: lightgray;
    width: 100%;
    left: 0%;
}

.formTitle{
    top: 8%;
}

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
  `;
// Citation for popup: https://www.youtube.com/watch?v=i8fAO_zyFAM&ab_channel=TylerPotts
function SubmodulePopup(props) {
    return (props.trigger)? (
        <PopupStyle>
        <div className="popup">
            <div className="popup-inner">
                <button className= "closebtn" onClick = {() => props.setTrigger(false)}>X</button>
                <h1 className= "formTitle">Add A New Submodule</h1>
                <div className = "line"></div>

                {props.children}
            </div>
        </div>
        </PopupStyle>
    ): "";
}

export default SubmodulePopup;