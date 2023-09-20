import React from 'react';
import s from './Sidebar.module.scss';
import SmallSidebar from './SmallSidebar/SmallSidebar';
import BigSidebar from './BigSidebar/BigSidebar';

interface SidebarProps {
  isSidebarOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen }) => {
  return <div className={s.sidebar}>{isSidebarOpen ? <BigSidebar /> : <SmallSidebar />}</div>;
};

export default Sidebar;
