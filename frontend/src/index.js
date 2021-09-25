import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { initializeApp } from "firebase/app"
import { initializeAnalytics } from "firebase/analytics"

const app = initializeApp({
  apiKey: "AIzaSyDEXOeD0dTclJnBQ3u97rFfaIJqINIS0t8",
  authDomain: "whatsapp-clone-1b27a.firebaseapp.com",
  projectId: "whatsapp-clone-1b27a",
  storageBucket: "whatsapp-clone-1b27a.appspot.com",
  messagingSenderId: "293988008403",
  appId: "1:293988008403:web:c87656f14596f14c072f26",
  measurementId: "G-GVXFCSG5QE"
})

initializeAnalytics(app)

ReactDOM.render(<App />, document.getElementById('root'));
