import farmService from './services/farmService';
import { serialize } from './utils/crud';
// #endregion Local Imports

export const EmployeeApi = {
  find: async (option = {}) => {
    let url = '/employees';
    const query = serialize(option);
    url += query;

    try {
      const response = await farmService.get(url);

      return response;
    } catch (error) {
      throw error;
    }
  },

  create: async body => {
    try {
      const response = await farmService.post('/employees', body);
      return response;
    } catch (error) {
      throw error;
    }
  },

  findOne: async (id, option = {}) => {
    let url = `/employees/${id}`;
    const query = serialize(option);
    url += query;

    try {
      const response = await farmService.get(url);

      return response;
    } catch (error) {
      throw error;
    }
  },

  update: async (id, body = {}) => {
    const url = `/employees/${id}`;

    try {
      const response = await farmService.patch(url, body);
      return response;
    } catch (error) {
      throw error;
    }
  },
};
