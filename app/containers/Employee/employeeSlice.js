import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { EmployeeApi } from 'api/employee';

export const findForTableList = createAsyncThunk(
  'employee/findForTableList',
  async (option, { rejectWithValue }) => {
    try {
      const response = await EmployeeApi.find(option);

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
  'employee/find',
  async (option, { rejectWithValue }) => {
    try {
      const response = await EmployeeApi.find(option);

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
  'employee/create',
  async (body, { rejectWithValue }) => {
    try {
      const response = await EmployeeApi.create(body);

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
  'employee/findOne',
  async (params, { rejectWithValue }) => {
    try {
      const { id, option } = params;
      const response = await EmployeeApi.findOne(id, option);

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
  'employee/update',
  async (params, { rejectWithValue }) => {
    try {
      const { id, body } = params;
      const response = await EmployeeApi.update(id, body);

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

const employeeSlice = createSlice({
  name: 'employee',
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
            avatar: item.avatar,
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

const { reducer: employeeReducer } = employeeSlice;

export default employeeReducer;
