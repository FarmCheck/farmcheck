import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DiaryAPI } from 'api/diary';

export const findForTableList = createAsyncThunk(
  'diary/findForTableList',
  async (option, { rejectWithValue }) => {
    try {
      const response = await DiaryAPI.find(option);

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
  'diary/find',
  async (option, { rejectWithValue }) => {
    try {
      const response = await DiaryAPI.find(option);

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
  'diary/create',
  async (body = {}, { rejectWithValue }) => {
    try {
      const response = await DiaryAPI.create(body);

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

const diarySlice = createSlice({
  name: 'diary',
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

const { reducer: diaryReducer } = diarySlice;

export default diaryReducer;
