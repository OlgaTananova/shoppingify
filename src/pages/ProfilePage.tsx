import React from 'react';
import Profile from '../components/Profile/Profile';
import Shopping from '../components/Shopping/Shopping';
import Sidebar from '../components/Sidebar/Sidebar';

function ProfilePage() {
  return (
    <>
      <Sidebar />
      <Profile />
      <Shopping />
    </>
  );
}

export default ProfilePage;
