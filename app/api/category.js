import farmService from './services/farmService';
import { serialize } from './utils/crud';
// #endregion Local Imports

export const CategoryApi = {
  find: async (option = {}) => {
    let url = '/categories';
    const query = serialize(option);
    url += query;

    try {
      const response = await farmService.get(url);

      return response;
    } catch (error) {
      throw error;
    }
  },
};
