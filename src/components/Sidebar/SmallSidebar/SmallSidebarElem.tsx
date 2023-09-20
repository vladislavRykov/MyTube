import React from 'react';
import s from './SmallSidebar.module.scss';
import { NavLink } from 'react-router-dom';
import { IconType } from 'react-icons';
import cn from 'classnames';

interface SmallSidebarElemProps {
  Picture: IconType;
  title: string;
  href: string;
}

const SmallSidebarElem: React.FC<SmallSidebarElemProps> = ({ Picture, title, href }) => {
  return (
    <NavLink to={href} className={({ isActive }) => cn(s.element, { [s.active]: isActive })}>
      <div className={s.element_content}>
        {<Picture className={s.element_img} />}
        <div className={s.element_title}>{title}</div>
      </div>
    </NavLink>
  );
};

export default SmallSidebarElem;
