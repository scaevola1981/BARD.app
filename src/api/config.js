import axios from 'axios';

// Obiect care stochează variabilele de mediu importate
const variables = {
  firebaseApiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyBJWtrGHWFu1vsx_irClwYB2Gho56WDiHI',
  databaseUrl: import.meta.env.VITE_DATABASE_URL || 'https://bard-app-4b284-default-rtdb.europe-west1.firebasedatabase.app',
  authApiUrl: import.meta.env.VITE_AUTH_API_URL || 'https://identitytoolkit.googleapis.com/v1',
};

// Crează o instanță Axios pentru comunicarea cu baza de date
const dbInstance = axios.create({
  baseURL: variables.databaseUrl,
  timeout: 5000,
});

// Crează o instanță Axios specializată pentru autentificare
const authInstance = axios.create({
  baseURL: variables.authApiUrl,
  timeout: 5000,
  params: {
    key: variables.firebaseApiKey,
  },
});

// Exportă ambele instanțe pentru a fi folosite în alte module
export { dbInstance, authInstance };
