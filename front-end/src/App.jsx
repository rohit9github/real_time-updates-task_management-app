import { useEffect } from "react";
import { requestForToken } from "./firebase";

function App() {
  useEffect(() => {
    navigator.serviceWorker
  .register('/firebase-messaging-sw.jsx')
  .then(function (registration) {
    console.log('Service Worker registered with scope:', registration.scope);
  })
  .catch(function (err) {
    console.log('Service Worker registration failed:', err);
  });

    requestForToken();
  }, []);

  

  return <div>Your Task Management App</div>;
}

export default App;
