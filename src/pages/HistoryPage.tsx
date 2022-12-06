import React from 'react';
import ShoppingHistory from '../components/ShoppingHistory/ShoppingHistory';
import Shopping from '../components/Shopping/Shopping';
import Sidebar from '../components/Sidebar/Sidebar';

function HistoryPage() {
  return (
    <>
      <Sidebar />
      <ShoppingHistory />
      <Shopping />
    </>
  );
}

export default HistoryPage;
