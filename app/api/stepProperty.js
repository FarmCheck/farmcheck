import farmService from './services/farmService';

export const StepPropertyAPI = {
  create: async body => {
    try {
      const response = await farmService.post(`/step-properties`, body);
      return response;
    } catch (error) {
      throw error;
    }
  },

  update: async (id, body = {}) => {
    const url = `/step-properties/${id}`;

    try {
      const response = await farmService.patch(url, body);
      return response;
    } catch (error) {
      throw error;
    }
  },

  remove: async id => {
    const url = `/step-properties/${id}`;

    try {
      const response = await farmService.delete(url);
      return response;
    } catch (error) {
      throw error;
    }
  },
};
