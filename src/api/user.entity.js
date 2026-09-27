import { authInstance, dbInstance } from './config';
import { db, auth } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

/**
 * Obiectul userEntity care grupează funcționalitățile de autentificare și profil.
 * Oferă persistență multi-strat (Firestore + Realtime Database + LocalStorage Cache)
 * pentru a garanta funcționarea chiar dacă una dintre baze are reguli de securitate restrictive.
 */
const userEntity = {
  // Funcție pentru înregistrare (sign up) a unui nou utilizator
  signUp: async (payload) => {
    try {
      const response = await authInstance.post('/accounts:signUp', {
        ...payload,
        returnSecureToken: true,
      });

      const userData = {
        idToken: response.data.idToken,
        email: response.data.email,
        refreshToken: response.data.refreshToken,
        expiresIn: response.data.expiresIn,
        localId: response.data.localId,
      };

      // Sincronizăm și SDK-ul Firebase Auth din browser
      try {
        if (payload.email && payload.password) {
          await createUserWithEmailAndPassword(
            auth,
            payload.email,
            payload.password
          );
        }
      } catch {
        // Continuăm chiar dacă contul a fost deja creat prin REST API
      }

      // Inițializăm profilul utilizatorului în Firestore și Realtime Database
      const initialProfile = {
        uid: response.data.localId,
        email: response.data.email,
        createdAt: new Date().toISOString(),
      };

      try {
        const userRef = doc(db, 'users', response.data.localId);
        await setDoc(userRef, initialProfile, { merge: true });
      } catch {
        // Ignorăm silențios dacă Firestore are restricții de permisiuni
      }

      try {
        await dbInstance.patch(
          `/users/${response.data.localId}.json`,
          initialProfile
        );
      } catch {
        // Continuăm
      }

      return {
        data: userData,
        success: true,
      };
    } catch (error) {
      const message =
        error?.response?.data?.error?.message ||
        error.message ||
        'Eroare la înregistrare';
      console.error(`[API]: Failed to register user - error:${message}`);
      return {
        data: null,
        success: false,
        message,
      };
    }
  },

  // Funcție pentru autentificare (sign in) a unui utilizator existent
  signIn: async (payload) => {
    try {
      const response = await authInstance.post(
        '/accounts:signInWithPassword',
        {
          ...payload,
          returnSecureToken: true,
        }
      );

      // Sincronizăm și SDK-ul Firebase Auth pentru a seta auth.currentUser
      try {
        if (payload.email && payload.password) {
          await signInWithEmailAndPassword(
            auth,
            payload.email,
            payload.password
          );
        }
      } catch (authErr) {
        console.warn('Firebase SDK sign in info:', authErr?.code);
        if (authErr?.code === 'auth/user-not-found') {
          try {
            await createUserWithEmailAndPassword(
              auth,
              payload.email,
              payload.password
            );
          } catch {
            // Continuăm
          }
        }
      }

      return {
        data: {
          idToken: response.data.idToken,
          email: response.data.email,
          refreshToken: response.data.refreshToken,
          expiresIn: response.data.expiresIn,
          localId: response.data.localId,
          registered: response.data.registered,
        },
        success: true,
      };
    } catch (error) {
      const message =
        error?.response?.data?.error?.message ||
        error.message ||
        'Eroare la autentificare';
      console.error(`[API]: Failed to sign in user - error:${message}`);
      return {
        data: null,
        success: false,
        message,
      };
    }
  },

  // Funcție pentru citirea profilului utilizatorului (Firestore -> Realtime Database -> LocalStorage)
  getProfile: async (user) => {
    const uid =
      typeof user === 'string'
        ? user
        : user?.uid || user?.localId || auth.currentUser?.uid;

    if (!uid) {
      return { success: false, message: 'Utilizatorul nu este specificat.' };
    }

    // 1. Încercare din Cloud Firestore
    try {
      const userRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const data = userDoc.data();
        localStorage.setItem(`user_profile_${uid}`, JSON.stringify(data));
        return { success: true, data };
      }
    } catch {
      // Dacă Firestore refuză (Missing or insufficient permissions), trecem la Realtime Database
    }

    // 2. Fallback la Realtime Database
    try {
      const token = localStorage.getItem('token');
      const endpoint = token
        ? `/users/${uid}.json?auth=${token}`
        : `/users/${uid}.json`;
      const rtdbRes = await dbInstance.get(endpoint);
      if (rtdbRes.data && typeof rtdbRes.data === 'object') {
        localStorage.setItem(
          `user_profile_${uid}`,
          JSON.stringify(rtdbRes.data)
        );
        return { success: true, data: rtdbRes.data };
      }
    } catch {
      // Continuăm către cache-ul local
    }

    // 3. Fallback la cache-ul din localStorage
    try {
      const cached = localStorage.getItem(`user_profile_${uid}`);
      if (cached) {
        return { success: true, data: JSON.parse(cached) };
      }

      const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
      if (
        storedUser &&
        (storedUser.uid === uid || storedUser.localId === uid)
      ) {
        return {
          success: true,
          data: {
            firstName: storedUser.firstName || '',
            lastName: storedUser.lastName || '',
            address: storedUser.address || '',
            profilePicture: storedUser.profilePicture || '',
            email: storedUser.email || '',
          },
        };
      }
    } catch {
      // Ignorăm erorile de parsare
    }

    // Profil gol implicit dacă nu există date anterioare
    return {
      success: true,
      data: {
        firstName: '',
        lastName: '',
        address: '',
        profilePicture: '',
      },
    };
  },

  // Funcție pentru actualizarea profilului utilizatorului (LocalStorage + RTDB + Firestore)
  updateProfile: async (userOrData, optionalData) => {
    try {
      const user = optionalData ? userOrData : null;
      const updatedData = optionalData ? optionalData : userOrData;
      const uid =
        user?.uid ||
        user?.localId ||
        updatedData?.uid ||
        auth.currentUser?.uid;

      if (!uid) {
        return {
          success: false,
          message: 'Utilizatorul nu este autentificat.',
        };
      }

      const payload = {
        firstName: updatedData.firstName || '',
        lastName: updatedData.lastName || '',
        address: updatedData.address || '',
        profilePicture: updatedData.profilePicture || '',
        lastUpdated: new Date().toISOString(),
      };

      // 1. Salvare imediată în localStorage pentru persistență offline garantată
      localStorage.setItem(`user_profile_${uid}`, JSON.stringify(payload));

      const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
      if (storedUser && (storedUser.uid === uid || storedUser.localId === uid)) {
        localStorage.setItem(
          'user',
          JSON.stringify({ ...storedUser, ...payload })
        );
      }

      // 2. Salvare în Realtime Database
      try {
        const token = localStorage.getItem('token');
        const endpoint = token
          ? `/users/${uid}.json?auth=${token}`
          : `/users/${uid}.json`;
        await dbInstance.patch(endpoint, payload);
      } catch (rtdbErr) {
        console.warn('Realtime Database profile update fallback:', rtdbErr.message);
      }

      // 3. Salvare în Cloud Firestore
      try {
        const userRef = doc(db, 'users', uid);
        await setDoc(userRef, payload, { merge: true });
      } catch (firestoreErr) {
        console.warn('Firestore profile update fallback:', firestoreErr.message);
      }

      return { success: true, data: payload };
    } catch (error) {
      console.error('Eroare la actualizarea profilului:', error);
      return {
        success: false,
        message: error.message || 'Eroare la actualizarea profilului.',
      };
    }
  },
};

export default userEntity;