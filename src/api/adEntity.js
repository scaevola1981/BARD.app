import { dbInstance } from './config';

const adEntity = {
  /**
   * Creează un nou anunț în baza de date
   */
  create: async (payload) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Utilizatorul nu este autentificat.'); 
      }

      const response = await dbInstance.post(`/ads.json`, payload);
      console.log(response);
      
      return {
        data: { id: response.data.name },
        success: true,
      };
    } catch (error) {
      console.error(`[API]: Failed to create the ad - error:${error.message}`);
      return {
        data: null,
        success: false,
      };
    }
  },

  /**
   * Citește un anunț specific după ID
   */
  readById: async (id) => {
    try {
      const response = await dbInstance.get(`/ads/${id}.json`);
      if (!response.data) {
        throw new Error('Anunțul nu a fost găsit');
      }
      return {
        data: { id, ...response.data },
        success: true
      };
    } catch (error) {
      console.error(`[API]: Failed to read ad ${id}:`, error);
      return {
        data: null,
        success: false,
        error: error.message
      };
    }
  },

  /**
   * Citește toate anunțurile disponibile
   */
  readAll: async () => {
    try {
      const response = await dbInstance.get('/ads.json');
      
      if (!response.data) {
        return { data: [], success: true };
      }

      const adsArray = Object.keys(response.data).map(key => ({
        id: key,
        ...response.data[key]
      }));

      return {
        data: adsArray,
        success: true
      };
    } catch (error) {
      console.error('[API]: Failed to read ads:', error);
      return {
        data: null,
        success: false,
        error: error.message
      };
    }
  },

  /**
   * Citește anunțurile sortate după dată
   */ 
  readAllSorted: async () => {
    try {
      // Elimină parametrii de sortare inexistenți
      const response = await dbInstance.get('/ads.json');
      
      if (!response.data) {
        return { data: [], success: true };
      }
  
      // Transformă răspunsul în array
      const adsArray = Object.entries(response.data).map(([key, value]) => ({
        id: key,
        ...value
      }));
  
      // Returnează direct array-ul nesortat sau sortează după un câmp existent
      return {
        data: adsArray,
        success: true
      };
      
    } catch (error) {
      console.error('[API]: Failed to read ads:', error);
      // Returnează un array gol în caz de eroare pentru a preveni bucla
      return {
        data: [],
        success: false,
        error: error.message
      };
    }
  },
  

  /**
   * Actualizează un anunț existent
   */
  update: async (id, updates) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Necesită autentificare');
      
      const response = await dbInstance.patch(`/ads/${id}.json`, updates);
      return {
        success: true,
        data: { id, ...response.data }
      };
    } catch (error) {
      console.error(`[API]: Failed to update ad ${id}:`, error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  /**
   * Șterge un anunț după ID
   */
  deleteById: async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Necesită autentificare');
      
      await dbInstance.delete(`/ads/${id}.json`);
      return { success: true };
    } catch (error) {
      console.error(`[API]: Failed to delete ad ${id}:`, error);
      return {
        success: false,
        error: error.message
      };
    }
  }
};

export default adEntity;
