import { createSlice } from '@reduxjs/toolkit';
import { getNotesAsync, addNoteAsync, removeNoteAsync, updateNoteTitleAsync, updateNoteParagraphAsync} from './thunks';
// used ChatGPT to figure out how to update one Note Item
const initialState = {
    notes: []
};


const notesPageSlice = createSlice( {
    name: 'notesPage',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getNotesAsync.fulfilled, (state, action) => {
            state.notes = action.payload;
        })
        .addCase(addNoteAsync.fulfilled, (state, action) => {
            state.notes = [...state.notes, action.payload]
        })
        .addCase(removeNoteAsync.fulfilled, (state, action) => {
            state.notes = state.notes.filter(
				(note) => note.noteId !== action.payload);
        })
        .addCase(updateNoteTitleAsync.fulfilled, (state, action) => {
            const updatedNote = action.payload; 
            state.notes = state.notes.map((note) =>
        note.noteId === updatedNote.noteId ? updatedNote : note
    )
    })
    .addCase(updateNoteParagraphAsync.fulfilled, (state, action) => {
        const updatedNote = action.payload; 
        state.notes = state.notes.map((note) =>
    note.noteId === updatedNote.noteId ? updatedNote : note
    )
    })
}
});


export const notesPageReducer = notesPageSlice.reducer;