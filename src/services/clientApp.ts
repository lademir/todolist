import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBx5IDdovKWn7XoRqwep80C9E-Kb8UheJE",
  authDomain: "todo-list-8e581.firebaseapp.com",
  projectId: "todo-list-8e581",
  storageBucket: "todo-list-8e581.appspot.com",
  messagingSenderId: "462368239669",
  appId: "1:462368239669:web:655480b5d9ce3645d6c17c",
};

// Initialize Firebase and Firestore (db)
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export { app, db };
