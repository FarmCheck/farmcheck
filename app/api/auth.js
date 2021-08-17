import identityService from 'api/services/identityService';

export const AuthApi = {
  loginForUser: async credential => {
    try {
      const response = await identityService.post(
        '/user/login-with-password',
        credential,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  loginForFarm: async id => {
    try {
      const response = await identityService.post(
        `/farm/user/login-with-farmid/${id}`,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  refreshAccessTokenForUser: async () => {
    try {
      const response = await identityService.post('/user/refresh-token');
      return response;
    } catch (error) {
      throw error;
    }
  },

  refreshAccessTokenForFarm: async () => {
    try {
      const response = await identityService.post('/farm/user/refresh-token');
      return response;
    } catch (error) {
      throw error;
    }
  },

  logoutForUser: async () => {
    try {
      const response = await identityService.post(`/user/logout`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  logoutForFarm: async () => {
    try {
      const response = await identityService.post(`farm/user/logout`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  logoutAll: async () => {
    try {
      const response = await identityService.post(`/user/logout-all`);
      return response;
    } catch (error) {
      throw error;
    }
  },
};
