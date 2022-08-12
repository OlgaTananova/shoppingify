import {
    createSlice,
    createAsyncThunk,
    PayloadAction,
} from "@reduxjs/toolkit";
import {
    IAddItemToShoppingListPayload,
    ICreateShoppingListPayload,
    IDeleteItemFromShoppingListPayload,
    IShoppingListInitialState
} from "../types";
import {createShoppingList, addItemToShoppingList, deleteItemFromShoppingList} from '../utils/apiShoppingLists';

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
    error: null
}

const changeState = (state: IShoppingListInitialState, action: PayloadAction<IShoppingListInitialState>) => {
    state.heading = action.payload.heading;
    state.date = action.payload.date;
    state.owner = action.payload.owner;
    state.items = action.payload.items;
    state.status = action.payload.status;
    state._id = action.payload._id;
    state.error = null;
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
        getActiveShoppingList(state, action) {
            changeState(state, action);
            state.requestStatus = 'succeeded';
        }
    },
    extraReducers(builder){
        builder
            .addCase(createNewShoppingList.pending, (state)=>{
            state.requestStatus = 'loading'
            })
            .addCase(createNewShoppingList.fulfilled, (state, action) => {
                state.requestStatus = 'succeeded';
                changeState(state, action);
            })
            .addCase(createNewShoppingList.rejected, (state, action)=>{
                state.requestStatus = 'failed';
                state.error = action.error.message;
            })
            .addCase(addNewItemToShoppingList.pending, (state)=>{
                state.requestStatus = 'loading'
            })
            .addCase(addNewItemToShoppingList.fulfilled, (state, action) => {
                state.requestStatus = 'succeeded';
                changeState(state, action);
            })
            .addCase(addNewItemToShoppingList.rejected, (state, action)=>{
                state.requestStatus = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteExistingItemFromSL.pending, (state)=>{
                state.requestStatus = 'loading'
            })
            .addCase(deleteExistingItemFromSL.fulfilled, (state, action) => {
                state.requestStatus = 'succeeded';
                changeState(state, action);
            })
            .addCase(deleteExistingItemFromSL.rejected, (state, action)=>{
                state.requestStatus = 'failed';
                state.error = action.error.message;
            })

    }
});

export const createNewShoppingList = createAsyncThunk('shoppingList/createShoppingList', async (values: ICreateShoppingListPayload)=>{
    return createShoppingList(values);
});

export const addNewItemToShoppingList = createAsyncThunk('shoppingList/addItemToShoppingList', async (values: IAddItemToShoppingListPayload)=>{
    return addItemToShoppingList(values);
});
export const deleteExistingItemFromSL = createAsyncThunk('shoppingList/deleteItemFromSL', async(values: IDeleteItemFromShoppingListPayload)=>{
    return deleteItemFromShoppingList(values);
})
export const {
    closeAddItemForm,
    openAddItemForm,
    setIsEditShoppingListFalse,
    setIsEditShoppingListTrue,
    getActiveShoppingList
} = shoppingSlice.actions

export default shoppingSlice.reducer
