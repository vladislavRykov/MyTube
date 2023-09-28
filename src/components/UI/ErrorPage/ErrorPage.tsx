import React from 'react';
import s from './ErrorPage.module.scss';
import { ErrorObject } from '../../../types/Common';
import popCat from '../../../assets/static/pop_cat.gif';
interface ErrorPageProps extends ErrorObject {}

const ErrorPage: React.FC<ErrorPageProps> = (error) => {
  return (
    <div className={s.errorPage}>
      <img className={s.errorPage_img} src={popCat} />
      <h2 className={s.errorPage_message}>{error.message}</h2>
      <h3 className={s.errorPage_type}>
        {error.type} - {error.status}
      </h3>
    </div>
  );
};

export default ErrorPage;
