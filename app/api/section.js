import farmService from './services/farmService';
import { serialize } from './utils/crud';

export const SectionAPI = {
  find: async (option = {}) => {
    let url = '/sections';
    const query = serialize(option);
    url += query;

    try {
      const response = await farmService.get(url);

      return response;
    } catch (error) {
      throw error;
    }
  },

  findDairyList: async id => {
    try {
      const response = await farmService.get(`/sections/${id}/diaries`);

      return response;
    } catch (error) {
      throw error;
    }
  },

  create: async body => {
    try {
      const response = await farmService.post(`/sections`, body);
      return response;
    } catch (error) {
      throw error;
    }
  },
};
