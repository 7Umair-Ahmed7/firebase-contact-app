// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCCBg4GANkLIKh3z0jlWzSSLNGB8DWZVo",
  authDomain: "contacts-app-52f9f.firebaseapp.com",
  projectId: "contacts-app-52f9f",
  storageBucket: "contacts-app-52f9f.appspot.com",
  messagingSenderId: "295868761553",
  appId: "1:295868761553:web:c9c401e7f27811c3a84cf0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
