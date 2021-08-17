import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SectionAPI } from 'api/section';

export const findForTableList = createAsyncThunk(
  'section/findForTableList',
  async (option, { rejectWithValue }) => {
    try {
      const response = await SectionAPI.find(option);

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

export const findDiaryList = createAsyncThunk(
  'section/findDiaryList',
  async (id, { rejectWithValue }) => {
    try {
      const response = await SectionAPI.findDairyList(id);

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
  'section/create',
  async (body = {}, { rejectWithValue }) => {
    try {
      const response = await SectionAPI.create(body);

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

const sectionSlice = createSlice({
  name: 'section',
  initialState: {
    tableList: [],
    list: [],
    diaryList: [],
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
          areaName: item.area && item.area.name,
          processName: item.process && item.process.name,
          productObjectName: item.productObject && item.productObject.name,
        }));

        state.tableList = newData;
      })
      .addCase(findDiaryList.fulfilled, (state, action) => {
        const { data } = action.payload;
        const { steps } = data;

        state.diaryList = steps;
      });
  },
});

const { reducer: sectionReducer } = sectionSlice;

export default sectionReducer;
