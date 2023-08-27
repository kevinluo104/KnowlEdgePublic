import React, {useState, useEffect} from 'react';
import NotesPageList from './NotesPageList';
import { useSelector, useDispatch } from 'react-redux';
// Citation for removing border from text box: https://stackoverflow.com/questions/63716950/border-around-text-input-when-clicked-in-react-native-on-web
 // Citation for creating base notes page https://www.youtube.com/watch?v=ulOKYl5sHGk&t=1362s&ab_channel=JamesGrimshaw 
 // errors fixed with ChatGPT
 // used ChatGPT to figure out how to add that pressing enter updates the Title and such that the textbox default value updates as well
import styled from 'styled-components';
import NavbarComponent from '../Components/Navbar';
import { getNotesAsync, addNoteAsync, removeNoteAsync, updateNoteTitleAsync, updateNoteParagraphAsync } from './redux/thunks';
import { useParams } from 'react-router-dom';

export default function NotesPage() {
const NotesPageStyle = styled.div`

.title{
    position: absolute;
    right: 5%;
    top: 10%;
    width: 60%;
    border: none;
}

.paragraph {
    position: absolute;
    right:5%;
    top: 15%;
    width:60%;
    height: 50%;
    border: none;
    outlineStyle: 'none'
}

input:focus{
    outlineStyle: 'none'}

.divider {
    position: absolute;
    border-top: 1px solid lightgray;
    background: lightgray;
    width: 60%;
    right: 5%;
    top: 14%;
}
.addNoteButton {
    position: absolute;
    left: 20%;
    top: 6%;
    font-size: 25px;

}

.notesTitle {
    position: absolute;
    top: 6%;
    left: 1%;
    font-size: 25px;
}
`;

const allNotes = useSelector((state) => state.notesPageReducer.notes);
const dispatch = useDispatch();
const [noteCurrent, setCurrentNote] = useState({});
const uid = useSelector((state) => state.user.currentUser.uid);

const [show, setShow] = useState(false);
const handleSubmit = (message) => {
    const note = {
      noteId: Date.now(),
      noteTitle: "",
      noteParagraph: "",
      notesCourse: dynamicSegmentValue,
      notesUid: uid
    };
   
    dispatch(
      addNoteAsync(
        note
      )
    );

    setCurrentNote(note);
    setShow(true);
  };
  const { '*': dynamicSegmentValue } = useParams();
  useEffect(() => {
    dispatch(getNotesAsync({ course: dynamicSegmentValue, notesUid: uid }));
  }, [dispatch, uid]);

  const handleClick = (title, paragraph, id, course) => {
    setCurrentNote({noteTitle: title, noteParagraph: paragraph, noteId: id, notesCourse: course});
    setShow(true);
  };

  const handleChangeTitle = ({ target, key }) => {
    if (key === 'Enter') {
      const newTitle = target.value;
      setCurrentNote({
        ...noteCurrent,
        noteTitle: newTitle,
      });
      dispatch(updateNoteTitleAsync({ id: noteCurrent.noteId, title: newTitle }));
    }
  };

  const handleChangeParagraph = ({ target, key }) => {
    if (key === 'Enter') {
      const newParagraph = target.value;
      setCurrentNote({
        ...noteCurrent,
        noteParagraph: newParagraph,
      });
      dispatch(updateNoteParagraphAsync({ id: noteCurrent.noteId, paragraph: newParagraph }));
    }
  };

  const handleDelete = (noteId) => {
    setCurrentNote({});
    dispatch(removeNoteAsync(noteId));
    setShow(false);

  };

      return (
        <NotesPageStyle>
        <NavbarComponent></NavbarComponent>
        <NotesPageList allNotes = {allNotes} handleDelete = {handleDelete} handleClick = {handleClick}></NotesPageList>
        <p className = "notesTitle">Notes</p>
        <button onClick = {() => handleSubmit("test")} className = "addNoteButton">+</button>
        
        
        { show && <div className = "noteBoxes">
        <input type="text" placeholder = "Title... (Press Enter to Submit Changes)" className = "title" defaultValue = {noteCurrent.noteTitle || ""} onKeyDown = {handleChangeTitle}></input>
        <div className = "divider"></div>
        <textarea placeholder = "Add Note... (Press Enter to Submit Changes)" className = "paragraph" defaultValue = {noteCurrent.noteParagraph} onKeyDown = {handleChangeParagraph}></textarea>
        </div>}
        </NotesPageStyle>
      );
}