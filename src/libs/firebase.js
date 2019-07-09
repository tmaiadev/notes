import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const {
  REACT_APP_FB_API_KEY,
  REACT_APP_FB_AUTH_DOMAIN,
  REACT_APP_FB_DATABASE_URL,
  REACT_APP_FB_PROJECT_ID,
  REACT_APP_FB_STORAGE_BUCKET,
  REACT_APP_FB_MESSAGE_SENDER_ID,
  REACT_APP_FB_APP_ID,
} = process.env;

firebase.initializeApp({
  apiKey: REACT_APP_FB_API_KEY,
  authDomain: REACT_APP_FB_AUTH_DOMAIN,
  databaseURL: REACT_APP_FB_DATABASE_URL,
  projectId: REACT_APP_FB_PROJECT_ID,
  storageBucket: REACT_APP_FB_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FB_MESSAGE_SENDER_ID,
  appId: REACT_APP_FB_APP_ID,
});

export default firebase;
