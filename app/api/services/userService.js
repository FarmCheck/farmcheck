// api/axiosClient.js
import axios from 'axios';
import queryString from 'query-string';
import { env } from 'env';

// Please have a look at here `https://github.com/axios/axios#request-config` for the full list of configs
const { CancelToken } = axios;
export const sourceCancel = CancelToken.source();

const baseURLUser = `${env.farmhub.userService}/api/v1`;

// farm service
const userService = axios.create({
  baseURL: baseURLUser,
  cancelToken: sourceCancel.token,
  headers: {
    'content-type': 'application/json',
    'is-debug': 'true',
  },
  paramsSerializer: params => queryString.stringify(params),
});

userService.interceptors.response.use(
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

export const setHeaderUserService = token => {
  if (!token) {
    if (sessionStorage && sessionStorage.getItem('token')) {
      userService.defaults.headers.common = {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json, */*',
        'Access-Control-Allow-Origin': '*',
      };
    }
  } else {
    userService.defaults.headers.common = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    };
  }
};

export default userService;
