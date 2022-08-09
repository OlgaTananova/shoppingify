import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {ICreateShoppingListPayload, IShoppingListInitialState} from "../types";
import {createShoppingList} from '../utils/apiShoppingLists';

const initialState: IShoppingListInitialState = {
    isAddItemFormOpened: false,
    isEditShoppingList: false,
    heading: 'Shopping List',
    date: '',
    owner: '',
    categories: [],
    status: 'idle',
    requestStatus: 'idle',
    error: null
}
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
    },
    extraReducers(builder){
        builder
            .addCase(createNewShoppingList.pending, (state)=>{
            state.requestStatus = 'loading'
            })
            .addCase(createNewShoppingList.fulfilled, (state, action) => {
                state.requestStatus = 'succeeded';
                state.heading = action.payload.heading;
                state.date = action.payload.date;
                state.owner = action.payload.owner;
                state.categories = action.payload.categories;
                state.status = action.payload.status;
                state.error = null;
            })
            .addCase(createNewShoppingList.rejected, (state, action)=>{
                state.requestStatus = 'failed';
                state.error = action.error.message;
            })
    }
});

export const createNewShoppingList = createAsyncThunk('shoppingList/createShoppingList', async (values: ICreateShoppingListPayload)=>{
    return createShoppingList(values);
});

export const {
    closeAddItemForm,
    openAddItemForm,
    setIsEditShoppingListFalse,
    setIsEditShoppingListTrue,
} = shoppingSlice.actions

export default shoppingSlice.reducer
