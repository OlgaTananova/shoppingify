import React from 'react';
import Logo from '../components/Logo/Logo';
import Navbar from '../components/Navbar/Navbar';
import Header from '../components/Header/Header';
import SearchForm from '../components/SearchForm/SearchForm';
import Shopping from '../components/Shopping/Shopping';
import Categories from '../components/Categories/Categories';
import Sidebar from '../components/Sidebar/Sidebar';

function ItemsPage() {
  return (
    <>
      <Sidebar />
      {/* <Logo /> */}
      {/* <Navbar /> */}
      <Header />
      <SearchForm />
      <Shopping />
      <Categories />
    </>
  );
}

export default ItemsPage;
