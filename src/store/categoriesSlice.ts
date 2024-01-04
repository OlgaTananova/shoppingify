import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ICategoryInitialState, IItem } from '../types';
import { createCategory, getCategories } from '../utils/apiItemsAndCategories';

const initialState: ICategoryInitialState = {
  categories: [],
  status: 'idle',
  error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    UpdateItemInCategory(state, action) {
      state.categories = action.payload;
    },
    addOrDeleteItemToCategory(state, action) {
      state.categories = state.categories.map((category) => {
        if (category._id === action.payload._id) {
          category.items = action.payload.items;
          return category;
        }
        return category;
      });
    },
    onLogoutCategoriesSlice(state) {
      state = initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = state.categories.concat(action.payload);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const fetchCategories = createAsyncThunk(
  'categories/getCategories',
  async () => getCategories(),
);
export const addCategory = createAsyncThunk(
  'categories/createCategory',
  async (category: string) => createCategory(category),
);

export const {
  UpdateItemInCategory,
  addOrDeleteItemToCategory,
  onLogoutCategoriesSlice,
} = categoriesSlice.actions;
export default categoriesSlice.reducer;
