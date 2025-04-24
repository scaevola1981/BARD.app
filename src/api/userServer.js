// userService.js
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export const saveUserToFirestore = async (userData) => {
  try {
    await setDoc(doc(db, "users", userData.localId), {
      uid: userData.localId,
      email: userData.email,
      lastActive: serverTimestamp(),
    }, { merge: true });
  } catch (err) {
    console.log("Eroare la salvarea userului:", err.message);
  }
};
