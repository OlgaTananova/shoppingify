import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    IAddItemToCategoryPayload,
    ICategoryInitialState,
    IDeleteItemFromCategoryPayload
} from "../types";
import {createCategory, getCategories, addItemToCategory, deleteItemFromCategory} from "../utils/apiItemsAndCategories";


const initialState: ICategoryInitialState = {
    categories: [],
    status: 'idle',
    error: null
};

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchCategories.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addCategory.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(addCategory.fulfilled,(state, action)=> {
                state.status = 'succeeded';
                state.categories = state.categories.concat(action.payload);
            })
            .addCase(addCategory.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewItemToCategory.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(addNewItemToCategory.fulfilled,(state, action)=> {
            state.status = 'succeeded';
            state.categories = state.categories.map((category) => {
                if (category._id === action.payload._id){
                    category.items = action.payload.items;
                    return category
                }
                return category
            })
        })
            .addCase(addNewItemToCategory.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(deleteExistingItemFromCategory.pending, (state, action) =>{
                state.status = 'loading';
            })
            .addCase(deleteExistingItemFromCategory.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.categories = state.categories.map((category) =>{
                    if (category._id === action.payload._id){
                        category.items = action.payload.items;
                        return category
                    }
                    return category
                })
            })
            .addCase(deleteExistingItemFromCategory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
    }
})

export const fetchCategories = createAsyncThunk('categories/getCategories', async()=>{
   return getCategories();

})
export const addCategory = createAsyncThunk('categories/createCategory', async (category:string) => {
    return createCategory(category);
})

export const addNewItemToCategory = createAsyncThunk('categories/addItemToCategory', async (value: IAddItemToCategoryPayload) => {
    return addItemToCategory(value);
});

export const deleteExistingItemFromCategory = createAsyncThunk('categories/deleteItemFromCategory', async (value: IDeleteItemFromCategoryPayload) => {
    return deleteItemFromCategory(value)
});

export default categoriesSlice.reducer;


