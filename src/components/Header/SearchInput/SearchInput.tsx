import React, { useRef, useState } from 'react';
import s from '../Header.module.scss';
import { BiMicrophone } from 'react-icons/bi';
import { BsSearch } from 'react-icons/bs';
import { RxCross1 } from 'react-icons/rx';
import cn from 'classnames';
import Button from '../../UI/Button/Button';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const SearchInput = () => {
  const [inputFocused, setIsInputFocused] = useState(false);
  const [searchValue, setSearchValue] = useState(localStorage.getItem('searchValue') || '');
  const navigate = useNavigate();
  const [_, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();
  const searchInput = useRef<HTMLInputElement>(null);

  const SearchHandler = () => {
    if (searchValue) {
      const searchString = searchValue.split(' ').join('+');
      localStorage.setItem('searchValue', searchValue);
      if (pathname === '/results') {
        setSearchParams((sParams) => {
          sParams.set('search', searchString);
          return sParams;
        });
      } else {
        navigate(`results?search=${searchString}`);
      }
    }
  };
  const SearchOnKeyDown: React.KeyboardEventHandler<HTMLInputElement> | undefined = (e) => {
    if (e.key == 'Enter') {
      SearchHandler();
    }
  };
  return (
    <div className={s.search}>
      <div className={s.search_flex}>
        <div className={cn(s.search_wrapper, { [s.inputFocus]: inputFocused })}>
          <BsSearch style={inputFocused ? { display: 'block' } : {}} className={s.search_findImg} />
          <input
            ref={searchInput}
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            placeholder="Введите запрос"
            className={s.search_input}
            onKeyDown={SearchOnKeyDown}
          />
          {searchValue && (
            <Button
              className={s.search_clear}
              onClick={() => {
                localStorage.removeItem('searchValue');
                setSearchValue('');
                searchInput.current?.focus();
              }}>
              <RxCross1 />
            </Button>
          )}
        </div>
        <button onClick={SearchHandler} className={s.search_btn}>
          <BsSearch className={s.search_btn_img} />
        </button>
      </div>
      <Button>
        <BiMicrophone className={s.search_micro} />
      </Button>
    </div>
  );
};

export default SearchInput;
