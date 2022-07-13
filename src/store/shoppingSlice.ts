import {createSlice} from "@reduxjs/toolkit";
import {IShopping} from "../types";

const initialState: IShopping = {
    isAddItemFormOpened: false,
    isEditShoppingList: false,
    isShoppingListEmpty: false
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
        setIsShoppingListEmptyTrue(state) {
            state.isShoppingListEmpty = true
        },
        setIsShoppingListEmptyFalse(state) {
            state.isShoppingListEmpty = false;
        }
    }
});

export const {
    closeAddItemForm,
    openAddItemForm,
    setIsEditShoppingListFalse,
    setIsEditShoppingListTrue,
    setIsShoppingListEmptyFalse,
    setIsShoppingListEmptyTrue
} = shoppingSlice.actions

export default shoppingSlice.reducer
