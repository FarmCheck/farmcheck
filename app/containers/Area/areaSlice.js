import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AreaApi } from 'api/area';

export const findForTableList = createAsyncThunk(
  'area/findForTableList',
  async (option, { rejectWithValue }) => {
    try {
      const response = await AreaApi.find(option);

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

export const find = createAsyncThunk(
  'area/find',
  async (option, { rejectWithValue }) => {
    try {
      const response = await AreaApi.find(option);

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

export const create = createAsyncThunk(
  'area/create',
  async (body, { rejectWithValue }) => {
    try {
      const response = await AreaApi.create(body);

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

export const findOne = createAsyncThunk(
  'area/findOne',
  async (params, { rejectWithValue }) => {
    try {
      const { id, option } = params;
      const response = await AreaApi.findOne(id, option);

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
  'area/update',
  async (params, { rejectWithValue }) => {
    try {
      const { id, body } = params;
      const response = await AreaApi.update(id, body);

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

const areaSlice = createSlice({
  name: 'area',
  initialState: {
    tableList: [],
    list: [],
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(findForTableList.fulfilled, (state, action) => {
        const { data } = action.payload;

        const newData = data.map(item => ({
          ...item,
          key: item.id,
          value: item.id,
          infoBox: {
            name: item.name,
            img: item.medias.length > 0 ? item.medias[0].urlThumbnail : '',
          },
        }));

        state.tableList = newData;
      })
      .addCase(find.fulfilled, (state, action) => {
        const { data } = action.payload;

        const newData = data.map(item => ({
          ...item,
          key: item.id,
          value: item.id,
        }));

        state.list = newData;
      });
  },
});

const { reducer: areaReducer } = areaSlice;

export default areaReducer;
