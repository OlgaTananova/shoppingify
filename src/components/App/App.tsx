import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import CancelShoppingListPopup from "../CancelShoppingListPopup/CancelShoppingListPopup";
import MainPage from '../../pages/MainPage' ;
import ItemsPage from '../../pages/ItemsPage';
import HistoryPage from '../../pages/HistoryPage';
import StatisticsPage from '../../pages/StatisticsPage';
import ProfilePage from '../../pages/ProfilePage';

function App() {

  return (
      <div className={'app'}>
         <Routes>
             <Route path={'/'} element={<MainPage />}/>
             <Route path={'/items'} element={<ItemsPage />}/>
             <Route path={'/history'} element={<HistoryPage />}/>
             <Route path={'history/:shoppingListId'} element={''}/>
             <Route path={'/statistics'} element={<StatisticsPage />}/>
             <Route path={'/profile'} element={<ProfilePage />} />
         </Routes>
          <CancelShoppingListPopup />
      </div>
  );
}

export default App;
