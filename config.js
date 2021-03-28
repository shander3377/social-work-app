import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyBUMGYbujDfFdhplUMKMLO2dTkCE4gEvvA",
    authDomain: "social-work-app-804ac.firebaseapp.com",
    projectId: "social-work-app-804ac",
    storageBucket: "social-work-app-804ac.appspot.com",
    messagingSenderId: "482972690616",
    appId: "1:482972690616:web:4fd0d80d50e1c1434c6c4d"
  };


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
