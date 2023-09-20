import React from 'react';
import LinkData from '../linkData';
import BigSidebarElem from './BigSidebarElem';
import s from './BigSidebar.module.scss';

const BigSidebar = () => {
  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        {LinkData.map(({ title, Picture, href }) => (
          <BigSidebarElem href={href} title={title} Picture={Picture} />
        ))}
      </div>
    </div>
  );
};

export default BigSidebar;
