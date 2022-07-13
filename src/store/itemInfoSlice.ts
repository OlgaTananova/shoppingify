import {IItemInfo} from "../types";
import {createSlice} from "@reduxjs/toolkit";


const initialState: IItemInfo = {
    isItemInfoOpen: false
}

const ItemInfoSlice = createSlice({
    name: 'itemInfo',
    initialState,
    reducers: {
        setItemInfoOpened(state) {
            state.isItemInfoOpen = true
        },
        setItemInfoClosed(state) {
            state.isItemInfoOpen = false
        }
    }
})

export const {setItemInfoOpened, setItemInfoClosed} = ItemInfoSlice.actions;
export default ItemInfoSlice.reducer
