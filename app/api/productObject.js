import farmService from './services/farmService';
import { serialize } from './utils/crud';

export const ProductObjectAPI = {
  find: async (option = {}) => {
    let url = '/product-objects';
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
      const response = await farmService.post(`/product-objects`, body);
      return response;
    } catch (error) {
      throw error;
    }
  },

  findOne: async (id, option = {}) => {
    let url = `/product-objects/${id}`;
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
    const url = `/product-objects/${id}`;

    try {
      const response = await farmService.patch(url, body);
      return response;
    } catch (error) {
      throw error;
    }
  },
};
