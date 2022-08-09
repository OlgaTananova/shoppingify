import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IShoppingListsInitialState} from "../types";
import {getShoppingLists} from "../utils/apiShoppingLists";

const initialState: IShoppingListsInitialState = {
    shoppingLists: [],
    status: 'idle',
    error: null
};

const shoppingHistorySlice = createSlice({
    name: 'shoppingHistory',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(getAllShoppingLists.pending,(state, action)=>{
                state.status = 'loading'
            })
            .addCase(getAllShoppingLists.fulfilled, (state, action)=>{
                state.status = 'succeeded';
                state.shoppingLists = action.payload;
            })
            .addCase(getAllShoppingLists.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export const getAllShoppingLists = createAsyncThunk('shoppingHistory/getShoppingLists', async ()=>{
    return getShoppingLists();
});

export default shoppingHistorySlice.reducer;
