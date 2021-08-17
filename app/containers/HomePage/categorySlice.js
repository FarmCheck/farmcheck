import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CategoryApi } from 'api/category';

export const find = createAsyncThunk(
  'category/find',
  async (option, { rejectWithValue }) => {
    try {
      const response = await CategoryApi.find(option);

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

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    list: [],
    subCategoriesHash: {},
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(find.fulfilled, (state, action) => {
      const { data } = action.payload;

      data.forEach(e => {
        const subCategories = e.subCategories.map(item => ({
          ...item,
          key: item.id,
          value: item.id,
        }));

        state.subCategoriesHash[e.id] = subCategories;
      });

      const newData = data.map(item => ({
        ...item,
        key: item.id,
        value: item.id,
      }));

      state.list = newData;
    });
  },
});

const { reducer: categoryReducer } = categorySlice;

export default categoryReducer;
