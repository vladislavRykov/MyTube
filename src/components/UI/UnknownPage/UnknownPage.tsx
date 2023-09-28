import React, { useEffect } from 'react';
import s from './UnknownPage.module.scss';
import { useNavigate } from 'react-router-dom';

const UnknownPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const cb = () => navigate('/');
    const timeout = setTimeout(cb, 3000);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <div className={s.wrapper}>
      <div className={s.contentBlock}>
        <h2 className={s.contentBlock_mainMessage}>Страницы не существует</h2>
        <h2 className={s.contentBlock_redirect}>
          Вы будете перенапраленны на главную страницу через 3 секунды...
        </h2>
      </div>
    </div>
  );
};

export default UnknownPage;
