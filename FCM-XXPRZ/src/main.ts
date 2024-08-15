import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrpS4Hs0h1Q3zDtz-2FtAqr_RYyNiSBrg",
  authDomain: "xxprz-firebase.firebaseapp.com",
  projectId: "xxprz-firebase",
  storageBucket: "xxprz-firebase.appspot.com",
  messagingSenderId: "801987605282",
  appId: "1:801987605282:web:d49e4fd6de539212be6b7b",
  measurementId: "G-5W0FNE7VW4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
