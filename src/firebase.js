import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAI5KTC_obSbS2yP2SsR0eoNJP4DoU1Ukw",
  authDomain: "eligo-members-eaea1.firebaseapp.com",
  databaseURL: "https://eligo-members-eaea1-default-rtdb.firebaseio.com",
  projectId: "eligo-members-eaea1",
  storageBucket: "eligo-members-eaea1.appspot.com", // ❌ Fixed (Corrected)
  messagingSenderId: "807561837898",
  appId: "1:807561837898:web:f58da5194bad16047f95b3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
