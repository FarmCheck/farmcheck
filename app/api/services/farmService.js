import axios from 'axios';
import queryString from 'query-string';
import { env } from 'env';

// Please have a look at here `https://github.com/axios/axios#request-config` for the full list of configs
const { CancelToken } = axios;
export const sourceCancel = CancelToken.source();

const baseURLFarm = `${env.farmhub.farmService}/api/v1`;

// farm service
const farmService = axios.create({
  baseURL: baseURLFarm,
  cancelToken: sourceCancel.token,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
  paramsSerializer: params => queryString.stringify(params),
});

farmService.interceptors.response.use(
  response => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  error => {
    throw error;
  },
);

export const getTokenBearer = () =>
  farmService.defaults.headers.common.Authorization;

export const updateTokenBearer = token => {
  farmService.defaults.headers.common.Authorization = token;
};

export const updateTokenID = token => {
  farmService.defaults.headers.common['Token-ID'] = token;
};

export default farmService;
