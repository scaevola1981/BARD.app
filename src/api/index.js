// Importăm modulele cu funcționalități specifice din fișierele corespunzătoare
import adEntity from './adEntity'; // Module pentru operații cu anunțuri
import userEntity from './user.entity'; // Module pentru operații cu utilizatori (autentificare/etc)
import templateEntity from './template.entity'; // Module pentru operații cu șabloane

// Creăm un obiect centralizat API care grupează toate funcționalitățile
const Api = {
  user: userEntity, // Expoză metodele pentru gestionarea utilizatorilor
  template: templateEntity, // Expoză metodele pentru gestionarea șabloanelor
  ad: adEntity, // Expoză metodele pentru gestionarea anunțurilor
};

// Exportăm obiectul API ca export default
export default Api;
