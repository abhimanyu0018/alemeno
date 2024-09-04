import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId:  import.meta.env.VITE_PROJECT_ID,
    storageBucket:  import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId:  import.meta.env.VITE_MESSAGEING_SENDER_ID,
    appId:  import.meta.env.VITE_APP_ID,
    measurementId:  import.meta.env.VITE_MEASUREMENT_ID
  };


  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);

  export { auth,db };