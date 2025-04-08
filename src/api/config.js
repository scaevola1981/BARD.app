import axios from 'axios';

// Obiect care stochează variabilele de mediu importate
const variables = {
  firebaseApiKey: import.meta.env.VITE_FIREBASE_API_KEY, // Cheia API Firebase
  databaseUrl: import.meta.env.VITE_DATABASE_URL,        // URL-ul bazei de date
  authApiUrl: import.meta.env.VITE_AUTH_API_URL,         // URL-ul API-ului de autentificare
};

// Debug: Afișează variabilele în consolă (doar pentru dezvoltare)
console.log(variables);

// Crează o instanță Axios pentru comunicarea cu baza de date
const dbInstance = axios.create({
  baseURL: import.meta.env.VITE_DATABASE_URL, // URL-ul de bază pentru cererile la baza de date
  timeout: 5000, // Timeout de 1 secundă pentru cereri
});

// Crează o instanță Axios specializată pentru autentificare
const authInstance = axios.create({
  baseURL: variables.authApiUrl, // URL-ul endpoint-urilor de autentificare
  timeout: 5000,                // Timeout de 1 secundă
  params: {
    key: variables.firebaseApiKey, // Adaugă cheia API Firebase ca parametru implicit
  },
});

// Exportă ambele instanțe pentru a fi folosite în alte module
export { dbInstance, authInstance };
