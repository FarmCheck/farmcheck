import axios from 'axios';
import farmService from './services/farmService';
import { serialize } from './utils/crud';
// #endregion Local Imports

export const FarmApi = {
  find: async (option = {}) => {
    let url = '/farms';
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
      const response = await farmService.post(`/farms`, body);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  findOne: async (id, option = {}) => {
    let url = `/farms/${id}`;
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
    const url = `/farms/${id}`;

    try {
      const response = await farmService.patch(url, body);
      return response;
    } catch (error) {
      throw error;
    }
  },

  getLocationInfo: async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyD0iY_6Ig-p9nMkYaeCmUb1tAq5UGUjnTI&language=vi`,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getLocationID: async (provinceCode, districtCode) => {
    try {
      const response = await farmService.get(
        `/locations?where={"provinceCode":"${provinceCode}","districtCode":"${districtCode}"}`,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
