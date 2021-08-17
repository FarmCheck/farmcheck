import farmService from './services/farmService';
import { serialize } from './utils/crud';

// #endregion Local Imports

export const CertificationAbleApi = {
  create: async params => {
    const { option, body } = params;

    let url = `/certification-ables`;

    const query = serialize(option);
    url += query;
    try {
      const response = await farmService.post(url, body);
      return response;
    } catch (error) {
      throw error;
    }
  },

  remove: async id => {
    try {
      const response = await farmService.delete(`/certification-ables/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  update: async params => {
    const { id, option, body } = params;

    let url = `/certification-ables/${id}`;
    const query = serialize(option);
    url += query;

    try {
      const response = await farmService.patch(url, body);
      return response;
    } catch (error) {
      throw error;
    }
  },
};
