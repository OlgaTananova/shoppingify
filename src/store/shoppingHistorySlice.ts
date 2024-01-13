import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {IShoppingList, IShoppingListsInitialState} from '../types';
import {deleteShoppingList, getShoppingLists} from '../utils/apiShoppingLists';

const initialState: IShoppingListsInitialState = {
    shoppingLists: [],
    status: 'idle',
    error: null,
};

const shoppingHistorySlice = createSlice({
    name: 'shoppingHistory',
    initialState,
    reducers: {
        onUpdateShoppingLists(state, action) {
            state.shoppingLists = action.payload;
        },
        onUpdateActiveShoppingList(state, action) {
            state.shoppingLists = state.shoppingLists.map((sl: IShoppingList) => {
                if (sl._id === action.payload.updatedShoppingList._id) {
                    sl =  action.payload.updatedShoppingList;
                    return sl;
                }
                return sl;
            });
        },
        onAddNewShoppingList(state, action) {
            state.shoppingLists.push(action.payload.addedShoppingList);
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getAllShoppingLists.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllShoppingLists.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.shoppingLists = action.payload;
                state.error = null;
            })
            .addCase(getAllShoppingLists.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteSL.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteSL.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.error = null;
                state.shoppingLists = state.shoppingLists.filter((sl) => {
                    return sl._id !== action.payload.deletedShoppingList._id;
                });
            })
            .addCase(deleteSL.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const getAllShoppingLists = createAsyncThunk(
    'shoppingHistory/getShoppingLists',
    async () => getShoppingLists(),
);

export const deleteSL = createAsyncThunk(
    'shoppingList/deleteSL',
    async (values: { id: string }) => deleteShoppingList(values),
);
export const {onUpdateShoppingLists, onUpdateActiveShoppingList, onAddNewShoppingList} = shoppingHistorySlice.actions;
export default shoppingHistorySlice.reducer;
