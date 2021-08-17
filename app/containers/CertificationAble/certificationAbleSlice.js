import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CertificationAbleApi } from 'api/certificationAble';

export const create = createAsyncThunk(
  'certificationAble/create',
  async (params, { rejectWithValue }) => {
    try {
      const response = await CertificationAbleApi.create(params);

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

export const update = createAsyncThunk(
  'certificationAble/update',
  async (params, { rejectWithValue }) => {
    try {
      const response = await CertificationAbleApi.update(params);

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

export const remove = createAsyncThunk(
  'certificationAble/remove',
  async (id, { rejectWithValue }) => {
    try {
      const response = await CertificationAbleApi.remove(id);
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

const certificationAbleSlice = createSlice({
  name: 'certificationAble',
  initialState: {
    tableList: [],
    list: [],
  },
  reducers: {},
  //   extraReducers: builder => {},
});

const { reducer: certificationAbleReducer } = certificationAbleSlice;

export default certificationAbleReducer;
