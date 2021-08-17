import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { StepAPI } from 'api/step';

export const findForTableList = createAsyncThunk(
  'step/findForTableList',
  async (option, { rejectWithValue }) => {
    try {
      const response = await StepAPI.find(option);

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
  'step/find',
  async (option, { rejectWithValue }) => {
    try {
      const response = await StepAPI.find(option);

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
  'step/create',
  async (body, { rejectWithValue }) => {
    try {
      const response = await StepAPI.create(body);

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
  'step/update',
  async (params, { rejectWithValue }) => {
    try {
      const { id, body } = params;
      const response = await StepAPI.update(id, body);

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

const stepSlice = createSlice({
  name: 'step',
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

const { reducer: stepReducer } = stepSlice;

export default stepReducer;
