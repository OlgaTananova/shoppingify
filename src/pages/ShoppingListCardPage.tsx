import React from 'react';
import Logo from '../components/Logo/Logo';
import Navbar from '../components/Navbar/Navbar';
import Shopping from '../components/Shopping/Shopping';
import ShoppingListCard from '../components/ShoppingListCard/ShoppingListCard';

function ShoppingListCardPage() {
  return (
    <>
      <Logo />
      <Navbar />
      <ShoppingListCard />
      <Shopping />
    </>
  );
}

export default ShoppingListCardPage;
