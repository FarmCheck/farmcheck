import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { OrganizationApi } from 'api/organization';

export const find = createAsyncThunk(
  'organization/find',
  async (option, { rejectWithValue }) => {
    try {
      const response = await OrganizationApi.find(option);

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

const organizationSlice = createSlice({
  name: 'organization',
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

const { reducer: organizationReducer } = organizationSlice;

export default organizationReducer;
