import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBT5c5lE26QkoThOQdNhmlkg5TWiNrL66U",
  authDomain: "dog-cat-translator-fb94b.firebaseapp.com",
  projectId: "dog-cat-translator-fb94b",
  storageBucket: "dog-cat-translator-fb94b.firebasestorage.app",
  messagingSenderId: "553726010724",
  appId: "1:553726010724:web:b6873dc0c968d6038e4671",
  measurementId: "G-BZ125QQ40G"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);