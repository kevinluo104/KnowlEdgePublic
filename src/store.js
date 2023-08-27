import { configureStore } from '@reduxjs/toolkit';
import { studentProfileRed } from './pages/studentProfilePage/studentProfileSlice';
import { announcementPageReducer } from './pages/Announcement-Page-Folder/redux/announcementPageSlice';
import ReducerAnnouncementPage from './reducers/ReducerAnnouncementPage';
// import indexCount from './reducers/indexCount';
import studentDashboardReducer from './pages/StudentDashboard/redux/StudentDashboardSlice';
// import CalendarEventReducer from './reducers/CalendarEventReducer';
import resourcePageReducer from './pages/ResourcePage/redux/ResourcePageSlice';
import { instructorProfileRed } from './pages/instructorProfilePage/instructorProfileSlice';
import { coursePageSliceReducer } from './pages/Student-Course-Page-Folder/redux/coursePageSlice';
import { eventReducer } from './pages/Calendar-Page-Folder/redux/CalendarEventSlice';
import { userReducer } from './pages/UserInfo/UserSlice';
import { classListReducer } from './pages/ResourcePage/redux/ClassListSlice';
import { ResourceTextReducer } from './pages/ResourcePage/redux/textResourceSlice';

import { employeeReducer } from './pages/UserInfo/redux/employeeSlice';

import { notesPageReducer } from './pages/Notes-Page-Folder/redux/notesPageSlice';
import ChatReducer from '../src/pages/ChatApp/redux/ChatSlice';
import { MainModeReducer } from './pages/ResourcePage/redux/resourcePageMainModeSlice';

export const store = configureStore({
  reducer: {
    studentProfileReducer: studentProfileRed,
    instructorProfileReducer: instructorProfileRed,
    announcementPageReducerStore: announcementPageReducer,
    studentDashboardReducer: studentDashboardReducer,
    ReducerAnnouncementPage: ReducerAnnouncementPage,
    // indexCount: indexCount,
    resourcePageReducer: resourcePageReducer,
    coursePageReducer: coursePageSliceReducer,
    event: eventReducer,
    user: userReducer,
    classListReducer: classListReducer,
    resourceTextReducer: ResourceTextReducer,
    employeeReducer: employeeReducer,
    notesPageReducer: notesPageReducer,
    ChatReducer: ChatReducer,
    MainModeReducer: MainModeReducer,
  },
  devTools: true,
});
