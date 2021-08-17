import JWTDecode from 'jwt-decode';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { AuthApi } from 'api/auth';
import {
  selected as selectedFarm,
  unSelected as unSelectedFarm,
} from 'containers/Farm/farmSlice';

import { updateTokenBearer as updateTokenBearerFarmService } from 'api/services/farmService';
import {
  updateTokenBearer as updateTokenBearerIdentityService,
  getTokenBearer as getTokenBearerIdentityService,
} from 'api/services/identityService';

export const loginForUser = createAsyncThunk(
  'auth/loginForUser',
  async (credential, { rejectWithValue }) => {
    try {
      const response = await AuthApi.loginForUser(credential);

      return response;
    } catch (err) {
      const error = err;
      if (!error.response) {
        throw err;
      }

      return rejectWithValue(error.response.data);
    }
  },
);

export const loginForFarm = createAsyncThunk(
  'auth/loginForFarm',
  async (farmID, { rejectWithValue, dispatch }) => {
    try {
      const response = await AuthApi.loginForFarm(farmID);

      dispatch(selectedFarm({ id: farmID }));
      return response;
    } catch (err) {
      const error = err;
      if (!error.response) {
        throw err;
      }

      return rejectWithValue(error.response.data);
    }
  },
);

export const refreshAccessTokenForUser = createAsyncThunk(
  'auth/refreshAccessTokenForUser',
  async (option, { rejectWithValue }) => {
    try {
      const response = await AuthApi.refreshAccessTokenForUser();

      return response;
    } catch (err) {
      const error = err;
      if (!error.response) {
        throw err;
      }

      return rejectWithValue(error.response.data);
    }
  },
);

export const refreshAccessTokenForFarm = createAsyncThunk(
  'auth/refreshAccessTokenForFarm',
  async (option, { rejectWithValue }) => {
    try {
      const response = await AuthApi.refreshAccessTokenForFarm();

      return response;
    } catch (err) {
      const error = err;
      if (!error.response) {
        throw err;
      }

      return rejectWithValue(error.response.data);
    }
  },
);

export const logoutForUser = createAsyncThunk(
  'auth/logoutForUser',
  async (credential, { rejectWithValue }) => {
    try {
      const response = await AuthApi.logoutForUser();

      return response;
    } catch (err) {
      const error = err;
      if (!error.response) {
        throw err;
      }

      return rejectWithValue(error.response.data);
    }
  },
);

export const logoutForFarm = createAsyncThunk(
  'auth/logoutForFarm',
  async (credential, { rejectWithValue, dispatch }) => {
    try {
      const response = await AuthApi.logoutForFarm();

      dispatch(unSelectedFarm());
      return response;
    } catch (err) {
      const error = err;
      if (!error.response) {
        throw err;
      }

      return rejectWithValue(error.response.data);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    farm: {
      isAuthenticated: false,
      isLogout: false,
      token: undefined,
    },
    user: {
      isAuthenticated: false,
      isLogout: false,
      token: undefined,
      item: undefined,
    },
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loginForUser.fulfilled, (state, action) => {
        const { accessToken } = action.payload.data;
        const { sub: id, familyName, givenName, avatar, email } = JWTDecode(
          accessToken,
        );

        state.user.isAuthenticated = true;
        state.user.isLogout = false;
        state.user.token = action.payload.data;
        state.user.item = {
          id,
          familyName,
          givenName,
          fullName: familyName + givenName,
          avatar,
          email,
        };

        updateTokenBearerFarmService(`Bearer ${accessToken}`);
        updateTokenBearerIdentityService(`Bearer ${accessToken}`);
      })
      .addCase(loginForFarm.fulfilled, (state, action) => {
        const { accessToken } = action.payload.data;

        state.farm.isAuthenticated = true;
        state.farm.isLogout = false;
        state.farm.token = action.payload.data;

        updateTokenBearerFarmService(`Bearer ${accessToken}`);
      })
      .addCase(refreshAccessTokenForUser.fulfilled, (state, action) => {
        const { accessToken } = action.payload.data;
        const { sub: id, familyName, givenName, avatar, email } = JWTDecode(
          accessToken,
        );

        state.user.isAuthenticated = true;
        state.user.isLogout = false;
        state.user.token = action.payload.data;
        state.user.item = {
          id,
          familyName,
          givenName,
          fullName: familyName + givenName,
          avatar,
          email,
        };

        updateTokenBearerFarmService(`Bearer ${accessToken}`);
        updateTokenBearerIdentityService(`Bearer ${accessToken}`);
      })
      .addCase(refreshAccessTokenForFarm.fulfilled, (state, action) => {
        const { accessToken } = action.payload.data;

        state.farm.isAuthenticated = true;
        state.farm.isLogout = false;
        state.farm.token = action.payload.data;

        updateTokenBearerFarmService(`Bearer ${accessToken}`);
      })
      .addCase(logoutForUser.fulfilled, state => {
        state.user.isAuthenticated = false;
        state.user.isLogout = true;
        state.user.token = undefined;
        state.user.item = undefined;

        state.farm.isAuthenticated = false;
        state.farm.isLogout = true;
        state.farm.token = undefined;

        updateTokenBearerFarmService('');
        updateTokenBearerIdentityService('');
      })
      .addCase(logoutForFarm.fulfilled, state => {
        state.farm.isAuthenticated = false;
        state.farm.isLogout = true;
        state.farm.token = undefined;

        const accessToken = getTokenBearerIdentityService();
        updateTokenBearerFarmService(accessToken);
      });
  },
});

const { reducer: authReducer } = authSlice;

export default authReducer;
