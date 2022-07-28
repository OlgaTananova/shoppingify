import {createSlice} from "@reduxjs/toolkit";
import {IShoppingList} from "../types";

const initialState: IShoppingList[] = [
    {
        id: '1',
        heading: 'Birthday party',
        date: new Date(2022, 1, 1).toISOString(),
        owner: '123',
        categories: [

            {
                name: 'Beverages',
                items: [['coke', 5], ['Fanta', 6]]
            },
            {
                name: 'Meat',
                items: [['chicken', 3], ['ground beef, kg', 2]]
            }
        ],
        status: 'completed'
    },
    {
        id: '2',
        heading: 'Grocery',
        date: new Date(2022, 2, 15).toISOString(),
        owner: '123',
        categories: [

            {
                name: 'Beverages',
                items: [['coffee', 5], ['Tea', 6]]
            },
            {
                name: 'Bakery',
                items: [['buns', 3], ['cake', 2]]
            }
        ],
        status: 'cancelled'
    },
    {
        id: '3',
        heading: 'Picnic party',
        date: new Date(2022, 2, 6).toISOString(),
        owner: '123',
        categories: [
            {
                name: 'Diary',
                items: [['milk', 1], ['yogurt', 4]]
            }
        ],
        status: 'completed'
    }
]

const shoppingHistorySlice = createSlice({
    name: 'shoppingHistory',
    initialState,
    reducers: {

    }
})

export default shoppingHistorySlice.reducer;
