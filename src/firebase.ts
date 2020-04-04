import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBvsWFh1ObECBcMXLhCoibc87BDSFEsZIE",
  databaseURL: "https://otium-95ca2.firebaseio.com",
  projectId: "otium-95ca2",
  storageBucket: "otium-95ca2.appspot.com",
  messagingSenderId: "692406720774",
  appId: "1:692406720774:web:bc2b43432e0c6df958e687",
  measurementId: "G-EVPJKBZ4QH"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const databaseRef = firebase.database().ref();
export const todosRef = databaseRef.child("todos");
export const itemsDatabaseReference = databaseRef.child("items");
