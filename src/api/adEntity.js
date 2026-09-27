import { db } from './firebase';
import { dbInstance } from './config';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from 'firebase/firestore';

/**
 * Modulul adEntity:
 * Lucrează direct cu Realtime Database (acum că este activat) și oferă fallback silențios
 * la Cloud Firestore dacă apar probleme de rețea sau disponibilitate.
 */
const adEntity = {
  /**
   * Creează un nou anunț în Realtime Database.
   */
  create: async (payload) => {
    // 1. Încercăm salvarea în Realtime Database
    try {
      const token = localStorage.getItem('token');
      const endpoint = token ? `/ads.json?auth=${token}` : `/ads.json`;
      const response = await dbInstance.post(endpoint, payload);

      return {
        data: { id: response.data?.name },
        success: true,
      };
    } catch (rtdbError) {
      // 2. Fallback la Cloud Firestore doar dacă RTDB eșuează
      try {
        const docRef = await addDoc(collection(db, 'ads'), {
          ...payload,
          createdAt: new Date().toISOString(),
        });
        return {
          data: { id: docRef.id },
          success: true,
        };
      } catch (firestoreError) {
        const msg =
          rtdbError.response?.data?.error ||
          rtdbError.message ||
          firestoreError.message ||
          'Eroare la salvarea anunțului';
        console.error('[API]: Salvarea a eșuat:', msg);
        return {
          data: null,
          success: false,
          error: msg,
        };
      }
    }
  },

  /**
   * Citește un anunț specific după ID.
   */
  readById: async (id) => {
    // 1. Căutare în Realtime Database
    try {
      const response = await dbInstance.get(`/ads/${id}.json`);
      if (response.data) {
        return {
          data: { id, ...response.data },
          success: true,
        };
      }
    } catch {
      // continuăm spre Firestore dacă nu s-a găsit în RTDB
    }

    // 2. Căutare în Cloud Firestore dacă ID-ul este de Firestore
    try {
      const docSnap = await getDoc(doc(db, 'ads', id));
      if (docSnap.exists()) {
        return {
          data: { id: docSnap.id, ...docSnap.data() },
          success: true,
        };
      }
    } catch {
      // ignorăm erorile de căutare
    }

    return {
      data: null,
      success: false,
      error: 'Anunțul nu a fost găsit.',
    };
  },

  /**
   * Citește toate anunțurile disponibile din Realtime Database.
   */
  readAll: async () => {
    let rtdbAds = [];
    try {
      const response = await dbInstance.get('/ads.json');
      if (response.data) {
        rtdbAds = Object.entries(response.data).map(([key, value]) => ({
          id: key,
          ...value,
        }));
      }
    } catch {
      // continuăm spre Firestore dacă RTDB e inaccesibil
    }

    // Dacă avem anunțuri din Realtime Database, le returnăm direct ordonate descrescător
    if (rtdbAds.length > 0) {
      rtdbAds.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
      return {
        data: rtdbAds,
        success: true,
      };
    }

    // Fallback: dacă RTDB este gol, citim din Cloud Firestore
    try {
      let q;
      try {
        q = query(collection(db, 'ads'), orderBy('timestamp', 'desc'));
      } catch {
        q = collection(db, 'ads');
      }
      const snapshot = await getDocs(q);
      const firestoreAds = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      return {
        data: firestoreAds,
        success: true,
      };
    } catch {
      return {
        data: [],
        success: true,
      };
    }
  },

  /**
   * Citește anunțurile sortate după dată
   */
  readAllSorted: async () => {
    return adEntity.readAll();
  },

  /**
   * Actualizează un anunț existent
   */
  update: async (id, updates) => {
    try {
      const token = localStorage.getItem('token');
      const endpoint = token
        ? `/ads/${id}.json?auth=${token}`
        : `/ads/${id}.json`;
      const response = await dbInstance.patch(endpoint, updates);
      return { success: true, data: { id, ...response.data } };
    } catch {
      try {
        await updateDoc(doc(db, 'ads', id), updates);
        return { success: true, data: { id, ...updates } };
      } catch (err) {
        return { success: false, error: err.message };
      }
    }
  },

  /**
   * Șterge un anunț după ID
   */
  deleteById: async (id) => {
    try {
      const token = localStorage.getItem('token');
      const endpoint = token
        ? `/ads/${id}.json?auth=${token}`
        : `/ads/${id}.json`;
      await dbInstance.delete(endpoint);
      return { success: true };
    } catch {
      try {
        await deleteDoc(doc(db, 'ads', id));
        return { success: true };
      } catch (err) {
        return { success: false, error: err.message };
      }
    }
  },
};

export default adEntity;
