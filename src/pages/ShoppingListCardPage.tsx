import React from 'react';
import Shopping from '../components/Shopping/Shopping';
import ShoppingListCard from '../components/ShoppingListCard/ShoppingListCard';
import Sidebar from '../components/Sidebar/Sidebar';

function ShoppingListCardPage() {
  return (
    <>
      <Sidebar />
      <ShoppingListCard />
      <Shopping />
    </>
  );
}

export default ShoppingListCardPage;
