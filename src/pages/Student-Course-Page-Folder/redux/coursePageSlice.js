// Code inspired from Workshop 2's react-redux-button-counter-2022 repo: https://github.com/danyakarras/react-redux-button-counter-2022
// Code inpsired from Workshop 3's cs455-express-demo repo: https://github.com/svmah/cs455-express-demo/tree/add-server
import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATE } from '../../../utils.js';
import { getStudySetsAsync,getNotesAsync, getAnnouncementsAsync, addModuleAsync, addSubmoduleAsync, getModuleAsync, getSubmoduleAsync, removeModuleAsync, removeSubmoduleAsync} from './thunks.js';

const initialState = {
    announcements: [],
    modules: [],
    submodules: [],
    getAnnouncements: REQUEST_STATE.IDLE,
    removeAnnouncement: REQUEST_STATE.IDLE,
    addAnnouncement: REQUEST_STATE.IDLE,
    notes: [],
    list: []
};


const coursePageSlice = createSlice( {
    name: 'coursePage',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAnnouncementsAsync.fulfilled, (state, action) => {
            state.getAnnouncements = REQUEST_STATE.FULFILLED;
            state.announcements = action.payload;
        })
        .addCase(addModuleAsync.fulfilled, (state, action) => {
            state.modules = [...state.modules, action.payload]
        })
        .addCase(addSubmoduleAsync.fulfilled, (state, action) => {
            state.submodules = [...state.submodules, action.payload]
        })
        .addCase(getModuleAsync.fulfilled, (state, action) => {
            state.modules = action.payload;
        })
        .addCase(getSubmoduleAsync.fulfilled, (state, action) => {
            state.submodules = action.payload;
        })
        .addCase(removeModuleAsync.fulfilled, (state, action) => {
            console.log(action.payload);
            state.modules = state.modules.filter(
				(module) => module.moduleId !== action.payload);
        })
        .addCase(removeSubmoduleAsync.fulfilled, (state, action) => {
            state.submodules = state.submodules.filter(
                (submodule) => submodule.submoduleId !== action.payload);
            
        })
        .addCase(getNotesAsync.fulfilled, (state, action) => {
            state.notes = action.payload;
        })
        .addCase(getStudySetsAsync.fulfilled, (state, action) => {
            state.getStudySets = REQUEST_STATE.FULFILLED;
            state.list = action.payload;
          })
    }
});


export const coursePageSliceReducer = coursePageSlice.reducer;