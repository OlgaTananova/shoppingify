import React from 'react';
import Logo from '../components/Logo/Logo';
import Navbar from '../components/Navbar/Navbar';
import Profile from '../components/Profile/Profile';
import Shopping from '../components/Shopping/Shopping';

function ProfilePage() {
  return (
    <>
      <Logo />
      <Navbar />
      <Profile />
      <Shopping />
    </>
  );
}

export default ProfilePage;
