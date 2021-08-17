import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ProductObjectAPI } from 'api/productObject';

export const findForTableList = createAsyncThunk(
  'productObjects/findForTableList',
  async (option, { rejectWithValue }) => {
    try {
      const response = await ProductObjectAPI.find(option);

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
  'productObjects/create',
  async (body, { rejectWithValue }) => {
    try {
      const response = await ProductObjectAPI.create(body);

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
  'productObjects/findOne',
  async (params, { rejectWithValue }) => {
    try {
      const { id, option } = params;
      const response = await ProductObjectAPI.findOne(id, option);

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
  'productObjects/update',
  async (params, { rejectWithValue }) => {
    try {
      const { id, body } = params;
      const response = await ProductObjectAPI.update(id, body);

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

const initialState = {
  tableList: [],
  list: [],
};

const productObjectSlice = createSlice({
  name: 'productObjects',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(findForTableList.fulfilled, (state, action) => {
      const { data } = action.payload;

      const newData = data.map(item => ({
        ...item,
        key: item.id,
        infoBox: {
          name: item.name,
          img: item.medias.length > 0 ? item.medias[0].urlThumbnail : '',
        },
      }));

      state.tableList = newData;
    });
  },
});

const { reducer: productObjectReducer } = productObjectSlice;

export default productObjectReducer;
