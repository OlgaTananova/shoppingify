import React from 'react';
import Logo from '../components/Logo/Logo';
import Navbar from '../components/Navbar/Navbar';
import ShoppingHistory from '../components/ShoppingHistory/ShoppingHistory';
import Shopping from '../components/Shopping/Shopping';

function HistoryPage() {
  return (
    <>
      <Logo />
      <Navbar />
      <ShoppingHistory />
      <Shopping />
    </>
  );
}

export default HistoryPage;
