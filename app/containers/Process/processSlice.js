import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProcessApi } from 'api/process';

export const findForTableList = createAsyncThunk(
  'process/findForTableList',
  async (option, { rejectWithValue }) => {
    try {
      const response = await ProcessApi.find(option);

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
  'process/find',
  async (option, { rejectWithValue }) => {
    try {
      const response = await ProcessApi.find(option);

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
  'process/create',
  async (body, { rejectWithValue }) => {
    try {
      const response = await ProcessApi.create(body);

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
  'process/findOne',
  async (params, { rejectWithValue }) => {
    try {
      const { id, option } = params;
      const response = await ProcessApi.findOne(id, option);

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
  'process/update',
  async (params, { rejectWithValue }) => {
    try {
      const { id, body } = params;
      const response = await ProcessApi.update(id, body);

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

export const createStep = createAsyncThunk(
  'process/createStep',
  async (body, { rejectWithValue }) => {
    try {
      const response = await ProcessApi.createStep(body);

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

export const updateStep = createAsyncThunk(
  'process/updateStep',
  async (params, { rejectWithValue }) => {
    try {
      const { id, body } = params;
      const response = await ProcessApi.updateStep(id, body);

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

export const createStepProperty = createAsyncThunk(
  'process/createStepProperty',
  async (body, { rejectWithValue }) => {
    try {
      const response = await ProcessApi.createStepProperty(body);

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

export const updateStepProperty = createAsyncThunk(
  'process/updateStepProperty',
  async (params, { rejectWithValue }) => {
    try {
      const { id, body } = params;
      const response = await ProcessApi.updateStepProperty(id, body);

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

export const removeStepProperty = createAsyncThunk(
  'process/removeStepProperty',
  async (id, { rejectWithValue }) => {
    try {
      const response = await ProcessApi.removeStepProperty(id);

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

const processSlice = createSlice({
  name: 'process',
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

const { reducer: processReducer } = processSlice;

export default processReducer;
