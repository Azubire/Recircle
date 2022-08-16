// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEgBFlrrgkuJHcbvDwaDUl9EfklBZ0iGo",
  authDomain: "letsrecycle-2cd4f.firebaseapp.com",
  projectId: "letsrecycle-2cd4f",
  storageBucket: "letsrecycle-2cd4f.appspot.com",
  messagingSenderId: "526004587697",
  appId: "1:526004587697:web:39f0ca97766e6a9f132690",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
