import { createSlice } from '@reduxjs/toolkit';
//import { REQUEST_STATE } from '../../utils.js';
import { addStudentToCourseAsync, deleteStudentFromCourseAsync} from '../../StudentDashboard/redux/thunks.js';
import { getCourseStudentListAsync } from './thunks.js';

// REDUCER TO SLICE https://www.youtube.com/watch?v=Fg-Anp4suwc&ab_channel=CodeBucks

const initialState = {
  classlist: [],
};

const classListSlice = createSlice({
  name: 'classlist',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addStudentToCourseAsync.fulfilled, (state, action) => {
      //  state.editStudentProfile = REQUEST_STATE.FULFILLED;
      console.log('ADDED AYSNC');
      console.log("VALUE: " + action.payload);
     // console.log("TYPE: " + typeof(action.payload[0]));
        state.classlist?.push(action.payload);
      })
      .addCase(addStudentToCourseAsync.pending, (state, action) => {
        //  state.editStudentProfile = REQUEST_STATE.FULFILLED;
        console.log('pend');
        //  state.classlist.push(action.payload);
        })
        .addCase(addStudentToCourseAsync.rejected, (state, action) => {
            //  state.editStudentProfile = REQUEST_STATE.FULFILLED;
            console.log('reject');
          //    state.classlist.push(action.payload);
            })
            .addCase(getCourseStudentListAsync.fulfilled, (state, action) => {
                //  state.editStudentProfile = REQUEST_STATE.FULFILLED;
                console.log('GETTING');
                console.log("VALUE: " + action.payload);
               //console.log("TYPE: " + typeof(action.payload[0]));
                  state.classlist = action.payload;
                })
                .addCase(getCourseStudentListAsync.pending, (state, action) => {
                  //  state.editStudentProfile = REQUEST_STATE.FULFILLED;
                  console.log('pend');
                  //  state.classlist.push(action.payload);
                  })
                  .addCase(getCourseStudentListAsync.rejected, (state, action) => {
                      //  state.editStudentProfile = REQUEST_STATE.FULFILLED;
                      console.log('reject');
                    //    state.classlist.push(action.payload);
                      })
      .addCase(deleteStudentFromCourseAsync.fulfilled, (state, action) => {
       // console.log("DDFDSSFD" + action.payload.id);
        let inx = state.classlist.findIndex(item => item == action.payload.id)
        state.classlist.splice(inx, 1);
       // state.classlist = action.payload;
      })
      .addCase(deleteStudentFromCourseAsync.pending, (state, action) => {
        console.log("pending");
        state.classlist = action.payload;
      })
      .addCase(deleteStudentFromCourseAsync.rejected, (state, action) => {
        console.log("rej");
        state.classlist = action.payload;
      })
  },
});

export const classListReducer = classListSlice.reducer;
