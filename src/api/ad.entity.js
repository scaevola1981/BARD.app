import { dbInstance } from './config'; // Importă instanța Axios configurată pentru baza de date



const adEntity = {
  /**
   * Creează un nou anunț în baza de date
   * @param {Object} payload - Obiectul cu datele anunțului
   * @returns {Object} - Obiect cu rezultatul operației (data și success status)
   */
  create: async (payload) => {
    try {
       
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('Utilizatorul nu este autentifcat.'); 
      }

      // Trimite cererea POST către endpoint-ul '/ads.json' cu payload-ul primit
      const response = await dbInstance.post(`/ads.json`, payload);

  
      // Loghează răspunsul pentru debugging (dezvoltare only)
      console.log(response);
      
      return {
        data: {
          // Aici poți include date relevante din răspuns
          id: response.data.name,
        },
        success: true, // Indică succesul operației
      };
    } catch (error) {
      // Loghează eroarea în consolă
      console.log(`[API]: Failed to create the ad - error:${error.message}`);
      
      return {
        data: null, // Nu există date în caz de eroare
        success: false, // Indică eșecul operației
      };
    }
  },

  /**
   * Citește un anunț specific după ID
   * @param {string} id - ID-ul anunțului
   */
  readById: () => {
    // Implementare viitoare
  },

  /**
   * Citește toate anunțurile disponibile
   */
  readAll: () => {
    // Implementare viitoare
  },

  /**
   * Actualizează un anunț existent
   * @param {string} id - ID-ul anunțului
   * @param {Object} updates - Obiectul cu actualizările
   */
  update: () => {
    // Implementare viitoare
  },

  /**
   * Șterge un anunț după ID
   * @param {string} id - ID-ul anunțului de șters
   */
  deleteById: () => {
    // Implementare viitoare
    // Observație: Există o greșeală de tipografie în numele funcției (deleById vs deleteById)
  },
};

export default adEntity;
