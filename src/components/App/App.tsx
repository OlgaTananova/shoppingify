import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Authbar from '../Authbar/Authbar';
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
import Logo from "../Logo/Logo";
import SearchForm from "../SearchForm/SearchForm";
import Shopping from "../Shopping/Shopping";
import Footer from "../Footer/Footer";

function App() {
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
                     <Shopping />
                 </> }/>
         </Routes>
      </div>
  );
}

export default App;
