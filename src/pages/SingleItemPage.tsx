import React from 'react';
import Logo from '../components/Logo/Logo';
import Navbar from '../components/Navbar/Navbar';
import Header from '../components/Header/Header';
import SearchForm from '../components/SearchForm/SearchForm';
import Categories from '../components/Categories/Categories';
import ItemInfo from '../components/ItemInfo/ItemInfo';

function SingleItemPage() {
  return (
    <>
      <Logo />
      <Navbar />
      <Header />
      <SearchForm />
      <ItemInfo />
      <Categories />
    </>
  );
}

export default SingleItemPage;
