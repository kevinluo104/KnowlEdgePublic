// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCgMfQHHsUB_DltQdIAUJ2fzrjd8dJ-aBg',
  authDomain: 'knowledge-72d21.firebaseapp.com',
  projectId: 'knowledge-72d21',
  storageBucket: 'knowledge-72d21.appspot.com',
  messagingSenderId: '948248250979',
  appId: '1:948248250979:web:30b1802a4da34d0dff0656',
  measurementId: 'G-2PL5HBVSXF',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

await setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log('Persistence set to local');
  })
  .catch((error) => {
    console.log('Failed to set persistence:', error);
  });

export { app, auth, analytics, db };
