import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDXViQJ79WEYDUJUoO-2wxL8E1WYuTF0lA",
  authDomain: "trello-clone-fdd1e.firebaseapp.com",
  projectId: "trello-clone-fdd1e",
  storageBucket: "trello-clone-fdd1e.appspot.com",
  messagingSenderId: "751405229206",
  appId: "1:751405229206:web:9204999b5faca4d7304eb7",
  measurementId: "G-YC7QCP1KRV"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const timestamp = serverTimestamp();

export { app, db, timestamp };
