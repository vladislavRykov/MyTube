import React from 'react';
import s from './Header.module.scss';
import { SlMenu } from 'react-icons/sl';
import { IoIosNotificationsOutline } from 'react-icons/io';
import youtubeLogo from '../../assets/static/youtube-logo.png';
import user from '../../assets/static/user.png';
import SearchInput from './SearchInput/SearchInput';
import Button from '../UI/Button/Button';
import { Link } from 'react-router-dom';

interface HeaderProps {
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ setIsSidebarOpen }) => {
  return (
    <div className={s.header}>
      <div className={s.header_left}>
        <Button onClick={() => setIsSidebarOpen((prev) => !prev)} className={s.header_menu}>
          <SlMenu />
        </Button>
        <Link to="/" className={s.header_link} reloadDocument>
          <img className={s.header_logo} src={youtubeLogo} alt="youtube logo" />
        </Link>
      </div>
      <div className={s.header_search}>
        <SearchInput />
      </div>
      <div>
        {/* <IoIosNotificationsOutline />
        <div>
          <img src="" />
        </div>
        <Link to={'auth'} className={s.header_log}>
          <img className={s.header_log_img} src={user} alt="user" />
          Войти
        </Link> */}
      </div>
    </div>
  );
};

export default Header;
