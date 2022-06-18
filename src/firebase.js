import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyA5kMhb8RFjCoLCOFgZjvUbb1G9nFQIfZk",
    authDomain: "trello-clone-react-app.firebaseapp.com",
    projectId: "trello-clone-react-app",
    storageBucket: "trello-clone-react-app.appspot.com",
    messagingSenderId: "706101411476",
    appId: "1:706101411476:web:4974e32063f1ac84d73e81"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const timestamp = serverTimestamp();

export { app, db, timestamp };