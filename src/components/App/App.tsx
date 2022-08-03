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
import {checkUser} from '../../store/profileSlice';
import {fetchItems} from "../../store/itemInfoSlice";
import {fetchCategories} from "../../store/categoriesSlice";
import NotFoundPage from "../../pages/NotFoundPage";
import {verifyUser} from "../../utils/apiUsers";



function App() {
    const userStatus = useAppSelector((state)=> state.editProfile.status);
    const userIsLoggedIn = useAppSelector((state)=> state.editProfile.isLoggedIn);
    const dispatch = useAppDispatch();
    const [isUserChecked, setIsUserChecked] = useState<boolean>(false);
    const navigate = useNavigate();


    useEffect(()=> {
        dispatch(checkUser()).unwrap()
            .then(()=>{
            setIsUserChecked(true);
        }).catch((err)=>{
            setIsUserChecked(true);
        })
    },[]);


    useEffect(() => {
        if (userIsLoggedIn) {
            Promise.all([dispatch(checkUser()).unwrap(),
                dispatch(fetchCategories()).unwrap(),
                dispatch(fetchItems()).unwrap()])
                .catch((err) => {
                    console.log(err);
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
      </div>
  );
}

export default App;
