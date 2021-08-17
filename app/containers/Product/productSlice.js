import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductApi } from 'api/product';

export const findForTableList = createAsyncThunk(
  'product/findForTableList',
  async (option, { rejectWithValue }) => {
    try {
      const response = await ProductApi.find(option);

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
  'product/find',
  async (option, { rejectWithValue }) => {
    try {
      const response = await ProductApi.find(option);

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
  'product/create',
  async (body, { rejectWithValue }) => {
    try {
      const response = await ProductApi.create(body);

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
  'product/findOne',
  async (params, { rejectWithValue }) => {
    try {
      const { id, option } = params;
      const response = await ProductApi.findOne(id, option);

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
  'product/update',
  async (params, { rejectWithValue }) => {
    try {
      const { id, body } = params;
      const response = await ProductApi.update(id, body);

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

const productSlice = createSlice({
  name: 'product',
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

const { reducer: productReducer } = productSlice;

export default productReducer;
