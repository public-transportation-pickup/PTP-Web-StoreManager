// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyCFl6DOfhSUZNW7kNizU-L8A-JCevJj-kA',
    authDomain: "ptp-project-b3ad4.firebaseapp.com",
    projectId: "ptp-project-b3ad4",
    storageBucket: "ptp-project-b3ad4.appspot.com",
    messagingSenderId: "268559531392",
    appId: "1:268559531392:web:dd2c7af3029704e96f5565",
    measurementId: "G-RMGKSTQD09"
};
//console.log("apikey:",firebaseConfig.apiKey);
// Initialize Firebase
export const app = initializeApp(firebaseConfig);