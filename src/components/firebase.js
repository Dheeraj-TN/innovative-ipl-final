// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// import firebase from "firebase";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXD22Yx-IaI6KJjcWyDlhMv4V-TGNl148",
  authDomain: "innovative-unveil-your-ideas.firebaseapp.com",
  projectId: "innovative-unveil-your-ideas",
  storageBucket: "innovative-unveil-your-ideas.appspot.com",
  messagingSenderId: "372700654711",
  appId: "1:372700654711:web:87b5f306b76c60960b2a72",
  measurementId: "G-NG7RC6N9BD",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default getFirestore(app);
export const storage = getStorage(app);