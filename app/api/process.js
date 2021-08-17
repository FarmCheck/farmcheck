import farmService from './services/farmService';
import { serialize } from './utils/crud';
// #endregion Local Imports

export const ProcessApi = {
  find: async (option = {}) => {
    let url = '/processes';
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
      const response = await farmService.post(`/processes`, body);
      return response;
    } catch (error) {
      throw error;
    }
  },

  findOne: async (id, option = {}) => {
    let url = `/processes/${id}`;
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
    const url = `/processes/${id}`;

    try {
      const response = await farmService.patch(url, body);
      return response;
    } catch (error) {
      throw error;
    }
  },

  createStep: async body => {
    try {
      const response = await farmService.post(`/steps`, body);
      return response;
    } catch (error) {
      throw error;
    }
  },

  updateStep: async (id, body = {}) => {
    const url = `/steps/${id}`;

    try {
      const response = await farmService.patch(url, body);
      return response;
    } catch (error) {
      throw error;
    }
  },

  createStepProperty: async body => {
    try {
      const response = await farmService.post(`/step-properties`, body);
      return response;
    } catch (error) {
      throw error;
    }
  },

  updateStepProperty: async (id, body = {}) => {
    const url = `/step-properties/${id}`;

    try {
      const response = await farmService.patch(url, body);
      return response;
    } catch (error) {
      throw error;
    }
  },

  removeStepProperty: async id => {
    const url = `/step-properties/${id}`;

    try {
      const response = await farmService.delete(url);
      return response;
    } catch (error) {
      throw error;
    }
  },
};
