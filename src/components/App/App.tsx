import React, {useState} from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Authbar from '../Authbar/Authbar';
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
import Logo from "../Logo/Logo";
import SearchForm from "../SearchForm/SearchForm";
import Shopping from "../Shopping/Shopping";
import Footer from "../Footer/Footer";
import Categories from "../Categories/Categories";

function App() {
    const [isItemInfoOpen, setIsItemInfoOpen] = useState<boolean>(false);

  return (
      <div className={'app'}>
         <Routes>
             <Route path={'/'} element={
                     <>
                         <Logo />
                         <Header />
                         <Authbar />
                 </> }/>
             <Route path={'/items'} element={
                 <>
                     <Logo />
                     <Navbar/>
                     <Header />
                     <SearchForm />
                     <Shopping isItemInfoOpen={isItemInfoOpen} setIsItemInfoOpen={setIsItemInfoOpen} />
                     <Categories setIsItemInfoOpen={setIsItemInfoOpen} />
                 </> }/>
             <Route path={'/history'} element={
                 <>
                     <Logo />
                     <Navbar/>
                     <Shopping isItemInfoOpen={isItemInfoOpen} setIsItemInfoOpen={setIsItemInfoOpen} />
                 </> }/>
             <Route path={'/statistics'} element={
                 <>
                     <Logo />
                     <Navbar/>
                     <Shopping isItemInfoOpen={isItemInfoOpen} setIsItemInfoOpen={setIsItemInfoOpen} />
                 </> }/>
         </Routes>
      </div>
  );
}

export default App;
