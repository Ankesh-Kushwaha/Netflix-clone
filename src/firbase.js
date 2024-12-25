// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"; // Corrected "firbase/auth" to "firebase/auth"

import { getFirestore, addDoc, collection } from "firebase/firestore"; // Corrected "firbase/firestore" to "firebase/firestore"
import { toast } from "react-toastify";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeZ7nevUOfirZxMu9cmmU30PD33BCPCgI",
  authDomain: "netflix-clone-1afea.firebaseapp.com",
  projectId: "netflix-clone-1afea",
  storageBucket: "netflix-clone-1afea.firebasestorage.app",
  messagingSenderId: "249429755290",
  appId: "1:249429755290:web:7135cdf7aaf35238476623",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(' '));
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(' '));
  }
};

const logOut = () => {
  signOut(auth);
};

export { auth, db, login, signUp, signOut, logOut };
