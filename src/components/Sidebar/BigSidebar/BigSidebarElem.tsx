import { NavLink } from 'react-router-dom';
import React from 'react';
import s from './BigSidebar.module.scss';
import { IconType } from 'react-icons';
import cn from 'classnames';

interface SmallSidebarElemProps {
  Picture: IconType;
  title: string;
  href: string;
}

const BigSidebarElem: React.FC<SmallSidebarElemProps> = ({ Picture, title, href }) => {
  return (
    <NavLink to={href} className={({ isActive }) => cn(s.element, { [s.active]: isActive })}>
      {<Picture className={s.element_img} />}
      <div className={s.element_title}>{title}</div>
    </NavLink>
  );
};

export default BigSidebarElem;
