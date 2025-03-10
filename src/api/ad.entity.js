import { dbInstance } from './config';

const adEntity = {
  // Tip : CRUD (CREATE / READ / UPDATE / DELETE)
  create: async (payload) => {
    try {
      // Trimite datele formularului către API-ul backend
      const response = await dbInstance.post('/ads.json', payload);
   

      console.log(response);
      return {
        data: {
       
        },
        success: true,
      };
    } catch (error) {
      console.log(`[API]: Failed to create the ad - error:${error.message}`);
      return {
        data: null,
        success: false,
      };
    }
  },
  readById: () => {},
  readAll: () => {},
  update: () => {},
  deleById: () => {},
};

export default adEntity;
