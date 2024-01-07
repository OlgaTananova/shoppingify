import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {IShoppingList, IShoppingListsInitialState} from '../types';
import {getShoppingLists} from '../utils/apiShoppingLists';

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
                    return action.payload.updatedShoppingList;
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
            })
            .addCase(getAllShoppingLists.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const getAllShoppingLists = createAsyncThunk(
    'shoppingHistory/getShoppingLists',
    async () => getShoppingLists(),
);
export const {onUpdateShoppingLists, onUpdateActiveShoppingList, onAddNewShoppingList} = shoppingHistorySlice.actions;
export default shoppingHistorySlice.reducer;
