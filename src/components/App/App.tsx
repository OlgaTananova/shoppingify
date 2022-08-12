import React, {useEffect, useState} from 'react';
import './App.css';
import {Routes, Route, useNavigate} from 'react-router-dom';
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
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {checkUser, setIsLoggedInTrue} from '../../store/profileSlice';
import {fetchItems} from "../../store/itemInfoSlice";
import {fetchCategories} from "../../store/categoriesSlice";
import NotFoundPage from "../../pages/NotFoundPage";
import Preloader from "../Preloader/Preloader";
import {setIsLoadingFalse, setIsLoadingTrue, setShowErrorFalse, setShowErrorTrue} from "../../store/appSlice";
import InfoPopup from "../InfoPopup/InfoPopup";
import {getAllShoppingLists} from "../../store/shoppingHistorySlice";
import {getActiveShoppingList} from "../../store/shoppingSlice";
import {IShoppingList} from "../../types";


function App() {
    const appStatus = useAppSelector(state=>state.app.appStatus);
    const isLoading = useAppSelector(state=> state.app.isLoading);
    const userIsLoggedIn = useAppSelector((state)=> state.profile.isLoggedIn);
    const dispatch = useAppDispatch();
    const isUserChecked = useAppSelector(state => state.app.isUserChecked);
    const navigate = useNavigate();

    useEffect(() => {
        if (userIsLoggedIn && appStatus === 'idle') {
            dispatch(setIsLoadingTrue());
            Promise.all([dispatch(checkUser()).unwrap(),
                dispatch(fetchCategories()).unwrap(),
                dispatch(fetchItems()).unwrap(),
                dispatch(getAllShoppingLists()).unwrap()])
                .then((data)=>{
                    const activeShoppingList = data[3].find((list: IShoppingList)=>{
                        return list.status === 'active';
                    });
                    if (activeShoppingList) {
                        dispatch(getActiveShoppingList(activeShoppingList));
                    }
                })
                .catch((err) => {
                    dispatch(setShowErrorTrue(err.message))
                })
                .finally(()=>{
                    dispatch(setIsLoadingFalse());
                })
        }
    }, [userIsLoggedIn, dispatch, navigate]);


  return (
      <div className={'app'}>
         <Routes>
             <Route path={'/'} element={<MainPage />}/>
             <Route path={'/signup'} element={<SignupPage />}/>
             <Route path={'/login'} element={<LoginPage />} />
             <Route path={'*'} element={<NotFoundPage/>}/>
             {isUserChecked && <>
                 <Route path={'/items'}
                        element={<ProtectedRoute><ItemsPage/></ProtectedRoute>}/>
               <Route path={'/items/:itemId'} element={<ProtectedRoute><SingleItemPage /></ProtectedRoute>} />
               <Route path={'/history'} element={<ProtectedRoute><HistoryPage /></ProtectedRoute>}/>
               <Route path={'history/:shoppingListId'} element={<ProtectedRoute><ShoppingListCardPage/></ProtectedRoute>}/>
               <Route path={'/statistics'} element={<ProtectedRoute><StatisticsPage /></ProtectedRoute>}/>
               <Route path={'/profile'} element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                 </>
             }

         </Routes>
          <CancelShoppingListPopup />
          {isLoading&& <Preloader />}
          <InfoPopup />
      </div>
  );
}

export default App;
