import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IAddItemPayload, IItemInitialState, IUpdateItemPayload } from '../types';
import {
  addItem, getItems, deleteItem, updateItem,
} from '../utils/apiItemsAndCategories';

const initialState: IItemInitialState = {
  items: [],
  status: 'idle',
  isEditItem: false,
  error: null,
};

const ItemInfoSlice = createSlice({
  name: 'itemInfo',
  initialState,
  reducers: {
    onLogoutItemsSlice(state) {
      state = initialState;
    },
    setIsEditItemTrue(state) {
      state.isEditItem = true;
    },
    setIsEditItemFalse(state) {
      state.isEditItem = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addNewItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload.item);
      })
      .addCase(addNewItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteExistingItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteExistingItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = state.items.filter((item) => item._id !== action.payload.item._id);
      })
      .addCase(deleteExistingItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateExistingItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateExistingItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = state.items.map((item) => {
          if (item._id === action.payload.updatedItem._id) {
            item = action.payload.updatedItem;
          }
          return item;
        });
      })
      .addCase(updateExistingItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const fetchItems = createAsyncThunk('items/getItems', async () => getItems());

export const addNewItem = createAsyncThunk('items/addItem', async (value: IAddItemPayload) => addItem(value));

export const deleteExistingItem = createAsyncThunk('items/deleteItem', async (id: string) => deleteItem(id));

export const updateExistingItem = createAsyncThunk('items/updateItem', async (values: IUpdateItemPayload) => updateItem(values));

export const { onLogoutItemsSlice, setIsEditItemFalse, setIsEditItemTrue } = ItemInfoSlice.actions;

export default ItemInfoSlice.reducer;
