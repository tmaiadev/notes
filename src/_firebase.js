const { firebase } = window;

const config = {
    apiKey: "xxx",
    authDomain: "xxx",
    databaseURL: "xxx",
    projectId: "xxx",
    storageBucket: "xxx",
    messagingSenderId: "xxx"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const storage = firebase.storage();
export const db = firebase.database();
export const GoogleAuthProvider = firebase.auth.GoogleAuthProvider;