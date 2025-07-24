// File: firebase.js
import { initializeApp } from 'firebase/app';
import {  
  getAuth,
  signInWithEmailLink,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithPhoneNumber,
  RecaptchaVerifier
} from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyCaGFyuQh-bUwGnakLOuGV_3E5GkVIIBjM",
  authDomain: "academic-ba178.firebaseapp.com",
  projectId: "academic-ba178",
  storageBucket: "academic-ba178.firebasestorage.app",
  messagingSenderId: "860703585037",
  appId: "1:860703585037:web:1e10a80be0a91e2802f644",
  measurementId: "G-D1LXPVS36Q"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default auth;
export {   
  signInWithEmailLink,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithPhoneNumber,
  RecaptchaVerifier 
};
