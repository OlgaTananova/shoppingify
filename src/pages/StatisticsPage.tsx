import React from 'react';
import Statistics from '../components/Statistics/Statistics';
import Shopping from '../components/Shopping/Shopping';
import Sidebar from '../components/Sidebar/Sidebar';

function StatisticsPage() {
  return (
    <>
      <Sidebar />
      <Statistics />
      <Shopping />
    </>
  );
}

export default StatisticsPage;
