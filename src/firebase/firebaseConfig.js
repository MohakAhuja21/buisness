import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"; 
import {getStorage} from "firebase/storage";


// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCyO3ncCVQoTwiGldaMRpn36GXyCLpb35s",
  authDomain: "buisness-23.firebaseapp.com",
  projectId: "buisness-23",
  storageBucket: "buisness-23.appspot.com",
  messagingSenderId: "62493232519",
  appId: "1:62493232519:web:8199ffd98407db8b6cd722",
  measurementId: "G-RXW202XEG7"
};

const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const storage=getStorage(app);
export const db=getFirestore(app);
// const analytics = getAnalytics(app);