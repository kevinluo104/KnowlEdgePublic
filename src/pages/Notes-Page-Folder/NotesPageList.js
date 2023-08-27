// Citation for look of list on the side: https://www.youtube.com/watch?v=ulOKYl5sHGk&t=1362s&ab_channel=JamesGrimshaw
import styled from 'styled-components';


export default function NotesPageList({allNotes, handleDelete, handleClick, currentNoteId}) {
    const NotesPageListStyle = styled.div`
    .notes-list{
        position: absolute;
        top: 10%;
        width: 30%;
        margin-left: 0.1%;
    }

    .delete-btn {
        position: relative;
        color: red;
        font-size: 13px;
        text-decoration: underline;
        margin-top: 1%;
        
    }

    .noteTitle {
      height: 30px;
    }
    .noteElement {
        height: 60px;
    }
    
    .noteElement:hover {
      background: lightgray;
    }
    `

    return (
        <NotesPageListStyle>
          <ul className={'notes-list'}>
            {allNotes.map(
                (note) => (
              
                  <li key={note.noteId} className={'noteElement'} onClick = {() => handleClick(note.noteTitle, note.noteParagraph,note.noteId, note.notesCourse)}>
                    <div className="note-element-header">
                      <h1 className={'noteTitle'}>{note.noteTitle}</h1>
                      <div className="menu-container">
                        <button
                          onClick={() => handleDelete(note.noteId)}
                          className="delete-btn">
                          delete
                        </button>
                      </div>
                    </div>
                  </li>
                )
              )}
          </ul>
          </NotesPageListStyle>
      );
}