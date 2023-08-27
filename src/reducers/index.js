// Code inspired from Workshop 2's react-redux-button-counter-2022 repo: https://github.com/danyakarras/react-redux-button-counter-2022
import { combineReducers } from 'redux';
import ReducerAnnouncementPage from './ReducerAnnouncementPage';
import studentProfileReducer from './studentProfileReducer';
import calendarEventReducer from './CalendarEventReducer';
import instructorProfileReducer from './instructorProfileReducer';

const rootReducer = combineReducers({
  ReducerAnnouncementPage,
  studentProfileReducer,
  instructorProfileReducer,
  calendarEventReducer,
});

export default rootReducer;
