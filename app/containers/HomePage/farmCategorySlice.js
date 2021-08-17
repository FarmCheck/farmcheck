import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FarmCategoryApi } from 'api/farmCategory';

export const create = createAsyncThunk(
  'farmCategory/create',
  async (body, { rejectWithValue }) => {
    try {
      const response = await FarmCategoryApi.create(body);
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

const farmCategorySlice = createSlice({
  name: 'certificationAble',
  initialState: {
    tableList: [],
    list: [],
  },
  reducers: {},
  //   extraReducers: builder => {},
});

const { reducer: farmCategoryReducer } = farmCategorySlice;

export default farmCategoryReducer;
