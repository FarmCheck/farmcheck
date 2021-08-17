import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CertificationApi } from 'api/certification';

export const find = createAsyncThunk(
  'certification/find',
  async (option, { rejectWithValue }) => {
    try {
      const response = await CertificationApi.find(option);

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

const certificationSlice = createSlice({
  name: 'certification',
  initialState: {
    list: [],
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(find.fulfilled, (state, action) => {
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

const { reducer: certificationReducer } = certificationSlice;

export default certificationReducer;
