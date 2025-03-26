import { authInstance } from './config';

// Obiectul userEntity care grupează funcționalitățile de autentificare
const userEntity = {
  // Funcție pentru înregistrare (sign up) a unui nou utilizator
  signUp: async (payload) => {
    try {
      // Trimitem cererea POST către endpoint-ul de înregistrare
      // payload conține datele utilizatorului (email, parolă etc.)
      // returnSecureToken: true cere serverului să returneze un token de autentificare
      const response = await authInstance.post('/accounts:signUp', {
        ...payload, // Spread operator pentru a include toate câmpurile din payload
        returnSecureToken: true,
      });
      
      // Returnăm un obiect cu datele relevante și starea success
      return {
        data: {
          idToken: response.data.idToken, // Token-ul de autentificare JWT
          email: response.data.email,    // Email-ul utilizatorului
          refreshToken: response.data.refreshToken, // Token pentru reîmprospătarea sesiunii
          expiresIn: response.data.expiresIn, // Durata de valabilitate a token-ului
          localId: response.data.localId,     // ID-ul unic al utilizatorului
        },
        success: true, // Indică că operațiunea a reușit
      };
    } catch (error) {
      // În caz de eroare, logăm mesajul și returnăm un obiect cu success: false
      console.log(`[API]: Failed to register user - error:${error.message}`);
      return {
        data: null,
        success: false,
      };
    }
  },

  // Funcție pentru autentificare (sign in) a unui utilizator existent
  signIn: async (payload) => {
    try {
      // Trimitem cererea POST către endpoint-ul de autentificare
      const response = await authInstance.post('/accounts:signInWithPassword', {
        ...payload,
        returnSecureToken: true,
      });
      
      // Returnăm răspunsul similar cu signUp, dar cu câmp suplimentar 'registered'
      return {
        data: {
          idToken: response.data.idToken,
          email: response.data.email,
          refreshToken: response.data.refreshToken,
          expiresIn: response.data.expiresIn,
          localId: response.data.localId,
          registered: response.data.registered // Indică dacă utilizatorul este înregistrat
        },
        success: true,
      };
    } catch (error) {
      console.log(`[API]: Failed to register user - error:${error.message}`);
      return {
        data: null,
        success: false,
      };
    }
  },
};

export default userEntity;