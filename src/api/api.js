import { authInstance } from './config';
import { db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const Api = {
  user: {
    signUp: async ({ email, password }) => {
      try {
        const response = await authInstance.post('/accounts:signUp', {
          email,
          password,
          returnSecureToken: true,
        });
        return { success: true, data: response.data };
      } catch (error) {
        return { success: false, message: error?.response?.data?.error?.message || 'Eroare la înregistrare' };
      }
    },

    signIn: async ({ email, password }) => {
      try {
        const response = await authInstance.post('/accounts:signInWithPassword', {
          email,
          password,
          returnSecureToken: true,
        });
        return { success: true, data: response.data };
      } catch (error) {
        return { success: false, message: error?.response?.data?.error?.message || 'Eroare la autentificare' };
      }
    },

    getProfile: async (user) => {
      try {
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          return { success: true, data: userDoc.data() };
        } else {
          return { success: false, message: 'Utilizatorul nu există.' };
        }
      } catch (error) {
        return { success: false, message: 'Eroare la preluarea profilului.' };
      }
    },

    updateProfile: async (user, updatedData) => {
      try {
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, updatedData, { merge: true });
        return { success: true };
      } catch (error) {
        return { success: false, message: 'Eroare la actualizarea profilului.' };
      }
    },
  },
};

export default Api;

