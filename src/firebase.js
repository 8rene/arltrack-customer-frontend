// src/firebase.js
// Firebase CLIENT SDK — used in the browser (React frontend).
// The Admin SDK lives in the backend only; never import firebase-admin here.

import { initializeApp }  from "firebase/app";
import { getFirestore }    from "firebase/firestore";
import { getAuth }         from "firebase/auth";
import { getStorage }      from "firebase/storage";

// All values come from .env (REACT_APP_ prefix is required by Create React App).
// Create a file called  .env  in the frontend root if it doesn't exist yet,
// and fill in the values from your Firebase project console:
//   Firebase console → Project settings → Your apps → Web app → Config
const firebaseConfig = {
  apiKey:            process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain:        process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId:         process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket:     process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const db      = getFirestore(app);
export const auth    = getAuth(app);
export const storage = getStorage(app);
export default app;
