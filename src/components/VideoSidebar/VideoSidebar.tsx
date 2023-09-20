import React from 'react';
import BigSidebar from '../Sidebar/BigSidebar/BigSidebar';
import LinkData from '../Sidebar/linkData';
import s from './VideoSidebar.module.scss';
import BigSidebarElem from '../Sidebar/BigSidebar/BigSidebarElem';
import Button from '../UI/Button/Button';
import { SlMenu } from 'react-icons/sl';
import youtubeLogo from '../../assets/static/youtube-logo.png';
import cn from 'classnames';

const VideoSidebar = ({ setIsSidebarOpen, isSidebarOpen }: any) => {
  return (
    <div>
      <div
        onClick={() => setIsSidebarOpen(false)}
        className={cn({ [s.blackout]: isSidebarOpen })}></div>
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(s.sidebar, { [s.sidebar_show]: isSidebarOpen })}>
        <div className={s.sidebar_header}>
          <Button
            onClick={() => setIsSidebarOpen((prev: any) => !prev)}
            className={s.sidebar_burger}>
            <SlMenu />
          </Button>
          <div onClick={() => window.location.reload()} className={s.sidebar_reload}>
            <img className={s.sidebar_logo} src={youtubeLogo} alt="youtube logo" />
          </div>
        </div>
        <div className={s.linkWrapper}>
          {LinkData.map(({ title, Picture, href }) => (
            <BigSidebarElem href={href} title={title} Picture={Picture} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoSidebar;
