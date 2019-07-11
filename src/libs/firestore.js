import firebase from './firebase';

const db = firebase.firestore();

db.enablePersistence()
  .catch((err) => {
    if (err.code === 'failed-precondition') {
      alert('You have multiple tabs open. This app may not work properly.');
    }
  });

export default db;
