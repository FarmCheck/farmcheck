import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FarmApi } from 'api/farm';

export const find = createAsyncThunk(
  'farm/find',
  async (option, { rejectWithValue }) => {
    try {
      const response = await FarmApi.find(option);

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
  'farm/create',
  async (body, { rejectWithValue }) => {
    try {
      const response = await FarmApi.create(body);

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
  'farm/findOne',
  async (params, { rejectWithValue }) => {
    try {
      const { id, option } = params;
      const response = await FarmApi.findOne(id, option);

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
  'farm/update',
  async (params, { rejectWithValue }) => {
    try {
      const { id, body } = params;
      const response = await FarmApi.update(id, body);

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

const farmSlice = createSlice({
  name: 'farm',
  initialState: {
    list: [],
    item: undefined,
  },
  reducers: {
    selected(state, action) {
      const { id } = action.payload;

      const idx = state.list.findIndex(e => e.id === id);

      if (idx > -1) {
        state.item = state.list[idx];
      }
    },
    unSelected(state) {
      state.item = undefined;
    },
  },
  extraReducers: builder => {
    builder.addCase(find.fulfilled, (state, action) => {
      const { data } = action.payload;

      const newData = data.map(item => ({
        ...item,
        key: item.id,
        img: item.medias.length > 0 ? item.medias[0].urlThumbnail : '',
      }));

      state.list = newData;
    });

    builder.addCase(update.fulfilled, (state, action) => {
      const { data } = action.payload;
      state.item = data;
    });
  },
});

const { actions, reducer: farmReducer } = farmSlice;

export const { selected, unSelected } = actions;
export default farmReducer;
