import {IAddItemPayload, IItemInitialState} from "../types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {addItem, getItems, deleteItem} from "../utils/apiItemsAndCategories";


const initialState: IItemInitialState = {
    items: [],
    status: 'idle',
    error: null,
}

const ItemInfoSlice = createSlice({
    name: 'itemInfo',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchItems.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.items = action.payload;
            })
            .addCase(fetchItems.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewItem.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(addNewItem.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items.push(action.payload)
            })
            .addCase(addNewItem.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteExistingItem.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(deleteExistingItem.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = state.items.filter((item) => {
                    return item._id !== action.payload._id;
                })
            })
            .addCase(deleteExistingItem.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload
            })

    }
})

export const fetchItems = createAsyncThunk('items/getItems', async () =>{
    return getItems();
});

export const addNewItem = createAsyncThunk('items/addItem', async (value: IAddItemPayload) => {
    return addItem(value)
});

export const deleteExistingItem = createAsyncThunk('items/deleteItem', async(id: string)=> {
    return deleteItem(id);
})

export default ItemInfoSlice.reducer;
