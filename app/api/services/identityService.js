// api/axiosClient.js
import axios from 'axios';
import queryString from 'query-string';
import { env } from 'env';

// Please have a look at here `https://github.com/axios/axios#request-config` for the full list of configs
const { CancelToken } = axios;
export const sourceCancel = CancelToken.source();

const baseURLIdentity = `${env.farmhub.identityService}/api/v1`;

// farm service
const identityService = axios.create({
  baseURL: baseURLIdentity,
  withCredentials: true,
  cancelToken: sourceCancel.token,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
  paramsSerializer: params => queryString.stringify(params),
});

identityService.interceptors.response.use(
  response => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  error => {
    // Handle errors
    throw error;
  },
);

export const getTokenBearer = () =>
  identityService.defaults.headers.common.Authorization;

export const updateTokenBearer = token => {
  identityService.defaults.headers.common.Authorization = token;
};

export default identityService;
