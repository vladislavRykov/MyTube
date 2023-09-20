import React, { useState } from 'react';
import s from './VideoWatchLayout.module.scss';
import Header from '../../Header/Header';
import VideoSidebar from '../../VideoSidebar/VideoSidebar';
import { Outlet } from 'react-router-dom';

const VideoWatchLayout = ({ children }: any) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className={s.wrapper}>
      <Header setIsSidebarOpen={setIsSidebarOpen} />
      <VideoSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <Outlet />
    </div>
  );
};

export default VideoWatchLayout;
