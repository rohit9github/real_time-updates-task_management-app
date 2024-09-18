import  { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// const firebaseConfig = {
//     apiKey: "AIzaSyCrqXOnbVe7UE4pHfD2iierm9NwAo2jqjc",
//     authDomain: "task-management-ec909.firebaseapp.com",
//     projectId: "task-management-ec909",
//     storageBucket: "task-management-ec909.appspot.com",
//     messagingSenderId: "690213977727",
//     appId: "1:690213977727:web:07cfc9b44e5320f630894a",
//     measurementId: "G-GMZJ9F7DKT"
// };

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestForToken = () => {
    return getToken(messaging, { vapidKey: "BOnA53t9YoKlA9R7nMElJZ2fi55g3IBglCoP-SB45fvZqlpDND7IcbBjNzMqpcfE2q85q2v_LrzJTlB06RiTTgw" })
      .then((currentToken) => {
        if (currentToken) {
          console.log("Current token for client: ", currentToken);
          return currentToken;
        } else {
          console.log("No registration token available. Request permission to generate one.");
        }
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token: ", err);
      });
  };

  onMessage(messaging, (payload) => {
    console.log("Message received. ", payload);
  });