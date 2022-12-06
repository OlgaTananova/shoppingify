import React from 'react';
import Header from '../components/Header/Header';
import SearchForm from '../components/SearchForm/SearchForm';
import Categories from '../components/Categories/Categories';
import ItemInfo from '../components/ItemInfo/ItemInfo';
import Sidebar from '../components/Sidebar/Sidebar';

function SingleItemPage() {
  return (
    <>
      <Sidebar />
      <Header />
      <SearchForm />
      <ItemInfo />
      <Categories />
    </>
  );
}

export default SingleItemPage;
