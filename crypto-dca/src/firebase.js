import firebase from "firebase/app";
import "firebase/auth";
import "firebase/functions";

let firebaseConfig = {
  apiKey: "AIzaSyDWuYyO2SKjbdrXCUhkWrAgAy8xPCEMEFc",
  authDomain: "bourse-4c048.firebaseapp.com",
  projectId: "bourse-4c048",
  storageBucket: "bourse-4c048.appspot.com",
  messagingSenderId: "60607040054",
  appId: "1:60607040054:web:320384a1b807263f27a697",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.app().functions().useEmulator("localhost", 5000);

export { firebase };

// export const auth = firebase.auth();
// export const functions = firebase.app().functions();
