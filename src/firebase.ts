import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/database";
// import {Item} from "./types/Item";

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

export const itemsDatabaseReference = databaseRef.child("items");


// export class itemsDatabaseReference {
//   items = {
//     "-M4-a1wdVcNWiDaozTE_": {"title": "ddd"},
//     "-M42uRDhN-nhn-1YCdC5": {"title": "cool"},
//     "-M4AG6NMoXsdXi0D2Qyc": {"title": "enoorme"},
//     "-M4DPqnHilxo0xbnKLlc": {"title": "test"},
//     "-M4EzqWyHhHAQHSnwWuu": {"title": "coucou"}
//   };
//
//   static on = (arg1: any, callback: any) => {
//     // @ts-ignore
//     this.items = {
//       "-M4-a1wdVcNWiDaozTE_": {"title": "ddd"},
//       "-M42uRDhN-nhn-1YCdC5": {"title": "cool"},
//       "-M4AG6NMoXsdXi0D2Qyc": {"title": "enoorme"},
//       "-M4DPqnHilxo0xbnKLlc": {"title": "test"},
//       "-M4EzqWyHhHAQHSnwWuu": {"title": "coucou"}
//     };
//     // @ts-ignore
//     this.callback = callback;
//     // @ts-ignore
//     this.callback({val: () => this.items});
//   };
//
//   static push = () => {
//     return {
//       set: (item: Item) => new Promise((resolve, reject) => {
//         // @ts-ignore
//         this.items = {
//           // @ts-ignore
//           // ...this.items,
//           "newID": item
//         };
//         // @ts-ignore
//         this.callback({val: () => this.items});
//         resolve("Added successfuly: " + item.title);
//       })
//     };
//   };
//
//   static off = (arg1: any, arg2: any) => console.log("Disconected.");
//
//   static child = (itemId: string) => {
//     return {
//       remove: () => new Promise((resolve => {
//         // @ts-ignore
//         this.items = {};
//         // @ts-ignore
//         this.callback({val: () => this.items});
//         console.log("Item removed: " + itemId);
//       }))
//     };
//   };
//
//   callback = (arg1: any) => {
//   };
// };

