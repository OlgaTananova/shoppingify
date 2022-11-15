import { combineReducers, configureStore } from '@reduxjs/toolkit';
import profileReducer from './profileSlice';
import itemInfoReducer from './itemInfoSlice';
import shoppingReducer from './shoppingSlice';
import shoppingHistoryReducer from './shoppingHistorySlice';
import categoryListReducer from './categoriesSlice';
import appReducer from './appSlice';

const rootReducer = combineReducers({
  profile: profileReducer,
  items: itemInfoReducer,
  shopping: shoppingReducer,
  shoppingHistory: shoppingHistoryReducer,
  categories: categoryListReducer,
  app: appReducer,

});

export function setupStore() {
  return configureStore({
    reducer: rootReducer,
  });
}

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
