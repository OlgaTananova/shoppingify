import {IItem, IItemInfo} from "../types";
import {createSlice} from "@reduxjs/toolkit";


const initialState: IItem[] = [
    {
        itemId: '3',
        name: 'cucumber',
        note:'cucumber....',
        image: 'cucumber',
        categoryId: '2'
    },
    {
        itemId: '4',
        name: 'tomato',
        note:'tomato....',
        image: 'https://media.istockphoto.com/photos/tomato-isolated-on-white-background-picture-id466175630?k=6&m=466175630&s=612x612&w=0&h=fu_mQBjGJZIliOWwCR0Vf2myRvKWyQDsymxEIi8tZ38=',
        categoryId: '2'
    }
]

const ItemInfoSlice = createSlice({
    name: 'itemInfo',
    initialState,
    reducers: {

    }
})

export default ItemInfoSlice.reducer
