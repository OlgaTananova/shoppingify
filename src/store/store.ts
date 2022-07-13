import {combineReducers, configureStore} from "@reduxjs/toolkit";
import profileReducer from './profileSlice';
import itemInfoReducer from './itemInfoSlice';
import shoppingReducer from './shoppingSlice';
import shoppingHistoryReducer from './shoppingHistorySlice';

const rootReducer = combineReducers({
    editProfile: profileReducer,
    ItemInfo: itemInfoReducer,
    shopping: shoppingReducer,
    shoppingHistory: shoppingHistoryReducer
})

export function setupStore() {
    return configureStore({
        reducer: rootReducer
    })
}

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch
