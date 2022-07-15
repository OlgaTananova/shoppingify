import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import CancelShoppingListPopup from "../CancelShoppingListPopup/CancelShoppingListPopup";
import MainPage from '../../pages/MainPage' ;
import ItemsPage from '../../pages/ItemsPage';
import HistoryPage from '../../pages/HistoryPage';
import StatisticsPage from '../../pages/StatisticsPage';
import ProfilePage from '../../pages/ProfilePage';
import ShoppingListCardPage from "../../pages/ShoppingListCardPage";
import SingleItemPage from "../../pages/SingleItemPage";
import SignupPage from "../../pages/SignupPage";
import LoginPage from "../../pages/LoginPage";

function App() {

  return (
      <div className={'app'}>
         <Routes>
             <Route path={'/'} element={<MainPage />}/>
             <Route path={'/items'} element={<ItemsPage />}/>
             <Route path={'/items/:itemId'} element={<SingleItemPage />} />
             <Route path={'/history'} element={<HistoryPage />}/>
             <Route path={'history/:shoppingListId'} element={<ShoppingListCardPage />}/>
             <Route path={'/statistics'} element={<StatisticsPage />}/>
             <Route path={'/profile'} element={<ProfilePage />} />
             <Route path={'/signup'} element={<SignupPage />}/>
             <Route path={'/login'} element={<LoginPage />} />
         </Routes>
          <CancelShoppingListPopup />
      </div>
  );
}

export default App;
