import React from 'react'
import styled from 'styled-components';
// citation for line: https://stackoverflow.com/questions/40697231/horizontal-line-in-the-middle-of-divs
// Citation for bringing popup to front using z-index: https://stackoverflow.com/questions/15782078/bring-element-to-front-using-css
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
    top: 6%;
    color: gray;
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
}`;
// Citation for popup: https://www.youtube.com/watch?v=i8fAO_zyFAM&ab_channel=TylerPotts
function InstructorCoursePagePopup(props) {
    return (props.trigger)? (
        <PopupStyle>
        <div className="popup">
            <div className="popup-inner">
                <button className= "closebtn" onClick = {() => props.setTrigger(false)}>X</button>
                <h1 className= "formTitle">Add A New Module</h1>
                <div className = "line"></div>
                    
                {props.children}
            </div>
        </div>
        </PopupStyle>
    ): "";
}

export default InstructorCoursePagePopup;