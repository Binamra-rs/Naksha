import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {

  apiKey: "AIzaSyChwyT22Oof6cDxQWgXEyU0syNd2-OyWOU",
  authDomain: "naksha-78325.firebaseapp.com",
  databaseURL: "https://naksha-78325-default-rtdb.firebaseio.com",
  projectId: "naksha-78325",
  storageBucket: "naksha-78325.firebasestorage.app",
  messagingSenderId: "292080892968",
  appId: "1:292080892968:web:e045fe3e3f05c0a8f5491d",
  measurementId: "G-BLPSVTDBP3"

};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);