import firebase from "firebase/app";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyC5-6wDhurqWv8TtiheISTkvDblQTMDy2w",
  authDomain: "waste-mgmt-15175.firebaseapp.com",
  projectId: "waste-mgmt-15175",
  storageBucket: "waste-mgmt-15175.appspot.com",
  messagingSenderId: "587730059845",
  appId: "1:587730059845:web:1ec4bf700fddef76d5992c",
  measurementId: "G-HBR1RMDR8E",
};

firebase.initializeApp(config);

export default firebase.firestore();
