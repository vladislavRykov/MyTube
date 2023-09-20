import React, { useState } from 'react';
import s from './MainLayout.module.scss';
import Header from '../../Header/Header';
import Sidebar from '../../Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

const MainLayout = ({ children }: any) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div className={s.wrapper}>
      <Header setIsSidebarOpen={setIsSidebarOpen} />
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <div className={s.main}>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
