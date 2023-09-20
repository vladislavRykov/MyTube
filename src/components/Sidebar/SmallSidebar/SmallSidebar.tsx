import React from 'react';
import SmallSidebarElem from './SmallSidebarElem';
import s from './SmallSidebar.module.scss';
import LinkData from '../linkData';

const SmallSidebar = () => {
  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        {LinkData.map(({ title, Picture, href }) => (
          <SmallSidebarElem key={href} href={href} Picture={Picture} title={title} />
        ))}
      </div>
    </div>
  );
};

export default SmallSidebar;
