import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDDzGqRjfilxS6WZRsEiLXC9uWGS7oOBxk",
  authDomain: "cs-487-prototype.firebaseapp.com",
  projectId: "cs-487-prototype",
  storageBucket: "cs-487-prototype.appspot.com",
  messagingSenderId: "68695942075",
  appId: "1:68695942075:web:0b51d531a59ba488065a9e",
  measurementId: "G-C1KZ9E9PVL"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };