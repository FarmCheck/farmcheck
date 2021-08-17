import farmService from './services/farmService';

// #endregion Local Imports

export const FarmCategoryApi = {
  create: async body => {
    try {
      const response = await farmService.post(`/farm-categories`, body);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
