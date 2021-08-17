import farmService from './services/farmService';

export const DiaryAPI = {
  create: async body => {
    try {
      const response = await farmService.post(`/diaries`, body);
      return response;
    } catch (error) {
      throw error;
    }
  },
};
