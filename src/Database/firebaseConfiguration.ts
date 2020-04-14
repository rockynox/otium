import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/database";
// import {ItemsDatabaseReferenceMock} from "./firebase.mock";

const firebaseConfig = {
    apiKey: "AIzaSyBvsWFh1ObECBcMXLhCoibc87BDSFEsZIE",
    databaseURL: "https://otium-95ca2.firebaseio.com",
    projectId: "otium-95ca2",
    storageBucket: "otium-95ca2.appspot.com",
    messagingSenderId: "692406720774",
    appId: "1:692406720774:web:bc2b43432e0c6df958e687",
    measurementId: "G-EVPJKBZ4QH"
};

let items;
let users;

// if (process.env.NODE_ENV === "development") {
//     items = new ItemsDatabaseReferenceMock();
//     users = new ItemsDatabaseReferenceMock();
// } else {
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const databaseRef = firebase.database().ref();

items = databaseRef.child("items");
users = databaseRef.child("users");
// }

export const databaseReference = {items, users};

