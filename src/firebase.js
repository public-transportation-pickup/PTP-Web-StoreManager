// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getToken, onMessage } from "firebase/messaging";
import { getMessaging } from "firebase/messaging/sw";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtQ7RhInYiZ83v_Yob-zcjkmSUxM9SVBA",
  authDomain: "capstone-ptp.firebaseapp.com",
  projectId: "capstone-ptp",
  storageBucket: "capstone-ptp.appspot.com",
  messagingSenderId: "1095658023043",
  appId: "1:1095658023043:web:3e41bfa6c8365993f093b6",
  measurementId: "G-TLT990C6KQ",
};
//console.log("apikey:",firebaseConfig.apiKey);
// Initialize Firebase
export const app = initializeApp(firebaseConfig);

const messaging = getMessaging();

export const requestForToken = () => {
  return getToken(messaging, {
    vapidKey:
      "BP-JABLvlie-L6JFmCY_hEXxm-nXOYHWrqch2GwrjYRdUjF-qWMeRSi9JWT1sGFQ8iGYpGGupYK_sCnd_KysLPs",
  })
    .then((currentToken) => {
      if (currentToken) {
        // console.log("current token for client: ", currentToken);
        return currentToken;
        // Perform any other neccessary action with the token
      } else {
        // Show permission request UI
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload);
      resolve(payload);
    });
  });
