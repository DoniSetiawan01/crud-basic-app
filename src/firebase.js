// src/firebase.js
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAaviDTYIedFCw3BtzsfLXRqphfWM5yotY",
  authDomain: "crud-basic-app-77df7.firebaseapp.com",
  projectId: "crud-basic-app-77df7",
  storageBucket: "crud-basic-app-77df7.appspot.com",
  messagingSenderId: "957607791317",
  appId: "1:957607791317:web:3222cb5ef77503880d305c"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();

export { auth, firestore };

