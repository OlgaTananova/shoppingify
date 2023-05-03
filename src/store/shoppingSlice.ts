import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from '@reduxjs/toolkit';
import {
  IAddItemToShoppingListPayload,
  ICreateShoppingListPayload,
  IDeleteItemFromShoppingListPayload, IMergeBillPayload, IShoppingItem,
  IShoppingListInitialState,
  IUpdateItemQtyInShoppingList,
  IUpdateItemStatusInShoppingList,
  IUpdateSLHeadingPayload,
  IUpdateSLStatusPayload, IUploadedShoppingItem,
} from '../types';
import {
  createShoppingList,
  addItemToShoppingList,
  deleteItemFromShoppingList,
  updateItemQtyInShoppingList, updateItemStatusInShoppingList, updateShoppingListHeading, updateShoppingListStatus,
  uploadBillAndGetShoppingList, mergeShoppingLists,
} from '../utils/apiShoppingLists';

const initialState: IShoppingListInitialState = {
  isAddItemFormOpened: false,
  isEditShoppingList: false,
  heading: 'Shopping List',
  date: '',
  owner: '',
  items: [],
  status: 'idle',
  requestStatus: 'idle',
  _id: '',
  error: null,
  uploadedItems: [],
  isUploadBillFormOpened: false,
};

const changeState = (state: IShoppingListInitialState, action: PayloadAction<IShoppingListInitialState>) => {
  state.heading = action.payload.heading;
  state.date = action.payload.date;
  state.owner = action.payload.owner;
  state.items = action.payload.items;
  state.status = action.payload.status;
  state._id = action.payload._id;
  state.error = null;
};

const shoppingSlice = createSlice({
  name: 'shopping',
  initialState,
  reducers: {
    openAddItemForm(state) {
      state.isAddItemFormOpened = true;
    },
    closeAddItemForm(state) {
      state.isAddItemFormOpened = false;
    },
    setIsEditShoppingListTrue(state) {
      state.isEditShoppingList = true;
    },
    setIsEditShoppingListFalse(state) {
      state.isEditShoppingList = false;
    },
    getActiveShoppingList(state, action) {
      changeState(state, action);
      state.requestStatus = 'succeeded';
    },
    clearShoppingList(state) {
      state = Object.assign(state, initialState);
    },
    openUploadBillForm(state) {
      state.isUploadBillFormOpened = true;
    },
    closeUploadBillForm(state) {
      state.isUploadBillFormOpened = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createNewShoppingList.pending, (state) => {
        state.requestStatus = 'loading';
      })
      .addCase(createNewShoppingList.fulfilled, (state, action) => {
        state.requestStatus = 'succeeded';
        changeState(state, action);
        state.isUploadBillFormOpened = false;
      })
      .addCase(createNewShoppingList.rejected, (state, action) => {
        state.requestStatus = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewItemToShoppingList.pending, (state) => {
        state.requestStatus = 'loading';
      })
      .addCase(addNewItemToShoppingList.fulfilled, (state, action) => {
        state.requestStatus = 'succeeded';
        changeState(state, action);
        state.isUploadBillFormOpened = false;
      })
      .addCase(addNewItemToShoppingList.rejected, (state, action) => {
        state.requestStatus = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteExistingItemFromSL.pending, (state) => {
        state.requestStatus = 'loading';
      })
      .addCase(deleteExistingItemFromSL.fulfilled, (state, action) => {
        state.requestStatus = 'succeeded';
        changeState(state, action);
      })
      .addCase(deleteExistingItemFromSL.rejected, (state, action) => {
        state.requestStatus = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateItemQtyInExistingSL.pending, (state) => {
        state.requestStatus = 'loading';
      })
      .addCase(updateItemQtyInExistingSL.fulfilled, (state, action) => {
        state.requestStatus = 'succeeded';
        state.items = action.payload.items;
      })
      .addCase(updateItemQtyInExistingSL.rejected, (state, action) => {
        state.requestStatus = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateItemStatusExistingSL.pending, (state) => {
        state.requestStatus = 'loading';
      })
      .addCase(updateItemStatusExistingSL.fulfilled, (state, action) => {
        state.requestStatus = 'succeeded';
        state.items = action.payload.items;
      })
      .addCase(updateItemStatusExistingSL.rejected, (state, action) => {
        state.requestStatus = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateExistingSLHeading.pending, (state) => {
        state.requestStatus = 'loading';
      })
      .addCase(updateExistingSLHeading.fulfilled, (state, action) => {
        state.requestStatus = 'succeeded';
        state.heading = action.payload.heading;
      })
      .addCase(updateExistingSLHeading.rejected, (state, action) => {
        state.requestStatus = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateSLStatus.pending, (state) => {
        state.requestStatus = 'loading';
      })
      .addCase(updateSLStatus.fulfilled, (state, action) => {
        state.requestStatus = 'succeeded';
        state.status = action.payload.status;
      })
      .addCase(updateSLStatus.rejected, (state, action) => {
        state.requestStatus = 'failed';
        state.error = action.error.message;
      })
      .addCase(uploadBillAndSL.pending, (state) => {
        state.requestStatus = 'loading';
      })
      .addCase(uploadBillAndSL.fulfilled, (state, action) => {
        state.requestStatus = 'succeeded';
        state.uploadedItems = action.payload;
        state.error = null;
      })
      .addCase(uploadBillAndSL.rejected, (state, action) => {
        state.requestStatus = 'failed';
        state.error = action.error.message;
      })
      .addCase(mergeBill.pending, (state) => {
        state.requestStatus = 'loading';
      })
      .addCase(mergeBill.fulfilled, (state, action) => {
        state.requestStatus = 'succeeded';
      })
      .addCase(mergeBill.rejected, (state, action) => {
        state.requestStatus = 'failed';
        state.error = action.error.message;
      });
  },
});

export const createNewShoppingList = createAsyncThunk('shoppingList/createShoppingList', async (values: ICreateShoppingListPayload) => createShoppingList(values));

export const addNewItemToShoppingList = createAsyncThunk('shoppingList/addItemToShoppingList', async (values: IAddItemToShoppingListPayload) => addItemToShoppingList(values));
export const deleteExistingItemFromSL = createAsyncThunk('shoppingList/deleteItemFromSL', async (values: IDeleteItemFromShoppingListPayload) => deleteItemFromShoppingList(values));

export const updateItemQtyInExistingSL = createAsyncThunk('shoppingList/updItemQty', async (values: IUpdateItemQtyInShoppingList) => updateItemQtyInShoppingList(values));

export const updateItemStatusExistingSL = createAsyncThunk('shoppingList/updItemStatus', async (values: IUpdateItemStatusInShoppingList) => updateItemStatusInShoppingList(values));

export const updateExistingSLHeading = createAsyncThunk('shoppingList/updSLHeading', async (values: IUpdateSLHeadingPayload) => updateShoppingListHeading(values));

export const updateSLStatus = createAsyncThunk('shoppingList/updSLStatus', async (values: IUpdateSLStatusPayload) => updateShoppingListStatus(values));

export const uploadBillAndSL = createAsyncThunk('shoppingList/uploadBillAndSL', async (values: FormData) => uploadBillAndGetShoppingList(values));

export const mergeBill = createAsyncThunk('shoppingList/mergeShoppingList', async (values: IMergeBillPayload) => mergeShoppingLists(values));

export const {
  closeAddItemForm,
  openAddItemForm,
  setIsEditShoppingListFalse,
  setIsEditShoppingListTrue,
  getActiveShoppingList,
  clearShoppingList,
  openUploadBillForm,
  closeUploadBillForm,
} = shoppingSlice.actions;

export default shoppingSlice.reducer;
