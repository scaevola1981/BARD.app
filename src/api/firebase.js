import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBJWtrGHWFu1vsx_irClwYB2Gho56WDiHI',
  authDomain: "bard-app-4b284.firebaseapp.com",
  projectId: "bard-app-4b284",
  storageBucket: "bard-app-4b284.appspot.com", // Folosește .appspot.com nu .firebasestorage.app
  messagingSenderId: "244796062237",
  appId: "1:244796062237:web:b80399f8056d535cbe24f4"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };