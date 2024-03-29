// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator, initializeFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
import { 
getAuth,
onAuthStateChanged, 
connectAuthEmulator,
} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: String(process.env.REACT_APP_FIREBASE_API_KEY),
  authDomain: String(process.env.REACT_APP_FIREBASE_AUTH_DOMAIN),
  databaseURL: String(process.env.REACT_APP_FIREBASE_DATABASE_URL),
  projectId: String(process.env.REACT_APP_FIREBASE_PROJECT_ID),
  storageBucket: String(process.env.REACT_APP_FIREBASE_STORAGE_BUCKET),
  messagingSenderId: String(process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID),
  appId: String(process.env.REACT_APP_FIREBASE_APP_ID),
  measurementId: String(process.env.REACT_APP_FIREBASE_MEASUREMENT_ID)
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
})
// Initialize Analytics and get a reference to the service
const auth = getAuth(app);
const useEmulators = process.env.REACT_APP_USE_EMULATORS === 'true';
if (useEmulators) {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db,'0.0.0.0', 8080);
}
export {
  auth,
  db,
  onAuthStateChanged,
}

export default app;