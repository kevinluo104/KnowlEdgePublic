import Login from './pages/UserInfo/Login';
import SignUp from './pages/UserInfo/Signup';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import StudentDashboard from './pages/StudentDashboard/StudentDashboard';
import CoursePage from './pages/Student-Course-Page-Folder/CoursePage';
import Announcement from './pages/Announcement-Page-Folder/Announcement';
import StudentProfileAndNavbarComponent from './pages/studentProfilePage/StudentProfileAndNavbarComponent';
import CalendarView from './pages/Calendar-Page-Folder/CalendarView';
import WebFont from 'webfontloader';
import { useEffect } from 'react';
import RequireAuth from './pages/Components/RequireAuth';
import ResourcePage from './pages/ResourcePage/ResourcePage';
import InstructorProfile from './pages/instructorProfilePage/InstructorProfile';
import EmailVerification from './pages/UserInfo/EmailVerification';
import FileUpload from './pages/Components/FileUpload';
import { useDispatch } from 'react-redux';
import { getUserAsync, postUserAsync } from './pages/UserInfo/UserThunks';
import { auth } from './firebase';
import { setPersistence, browserSessionPersistence } from 'firebase/auth';
import ClassList from './pages/ResourcePage/ClassList';
import NotesPage from './pages/Notes-Page-Folder/NotesPage';
import LargePanel from './pages/ChatApp/LargePanel';
console.warn = () => {};

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    WebFont.load({
      google: {
        families: [
          'Poppins:300,400,500,600,700',
          'Roboto:300,400,500,700',
          'Nunito+Sans:300,400,700',
        ],
      },
    });
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        // Persistence setting applied
        // You can proceed with other initialization steps
        // ...

        // Check if there is a user session
        const user = auth.currentUser;
        if (user) {
          const { uid, email, displayName } = user;
          const userData = { uid, email, displayName };
          dispatch(postUserAsync(userData));
          dispatch(getUserAsync(uid));
        } else {
          // No user session, clear the token or perform any necessary cleanup
          sessionStorage.removeItem('userToken');
        }
      })
      .catch((error) => {
        // Handle persistence setting errors
        console.log('Error setting persistence:', error);
      });
  }, []);

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <StudentDashboard />
              </RequireAuth>
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/emailverification" element={<EmailVerification />} />
          <Route
            path="/courses/*"
            element={
              <RequireAuth>
                <CoursePage />
              </RequireAuth>
            }
          />
          <Route
            path="/announcements/*"
            element={
              <RequireAuth>
                <Announcement />
              </RequireAuth>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <StudentProfileAndNavbarComponent />
              </RequireAuth>
            }
          />
          <Route
            path="/calendar"
            element={
              <RequireAuth>
                <CalendarView />
              </RequireAuth>
            }
          />
          <Route
            path="/instructorProfile"
            element={
              <RequireAuth>
                <InstructorProfile />
              </RequireAuth>
            }
          />

          <Route
            path="/courses/:courseTitle/classList"
            element={
              <RequireAuth>
                <ClassList />
              </RequireAuth>
            }
          />

          <Route
            path="/courses/:courseTitle/resource/:resourceName"
            element={
              <RequireAuth>
                <ResourcePage />
              </RequireAuth>
            }
          />

          <Route
            path="/courses/:courseTitle/resource/:resourceName"
            element={
              <RequireAuth>
                <ResourcePage />
              </RequireAuth>
            }
          />

          <Route
            path="/messages"
            element={
              <RequireAuth>
                <LargePanel />
              </RequireAuth>
            }
          />

          <Route
            path="/notes/*"
            element={
              <RequireAuth>
                <NotesPage />
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
