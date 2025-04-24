import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// === Inițializări Firebase ===
const firebaseConfig = {
  apiKey: 'AIzaSyBJWtrGHWFu1vsx_irClwYB2Gho56WDiHI',
  authDomain: "bard-app-4b284.firebaseapp.com",
  projectId: "bard-app-4b284",
  storageBucket: "bard-app-4b284.appspot.com", 
  messagingSenderId: "244796062237",
  appId: "1:244796062237:web:b80399f8056d535cbe24f4"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export const auth = getAuth(app);
const db = getFirestore(app);

// === Funcții utile pentru chat și autentificare ===
export const createUserIfNotExists = async (user) => {
  const userRef = doc(db, "users", user.uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || "",
      photoURL: user.photoURL || "",
      createdAt: new Date(),
    });
  }
};

export const getCurrentUser = () => {
  return auth.currentUser;
};

export const observeAuthState = (callback) => {
  return onAuthStateChanged(auth, user => {
    callback(user);
  });
};

// Exemplu de folosire
observeAuthState((user) => {
  if (user) {
    console.log("User este logat:", user.uid);
  } else {
    console.log("User delogat");
  }
});

export { storage, db };
