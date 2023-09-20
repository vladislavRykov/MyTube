import React, { ComponentPropsWithoutRef, PropsWithChildren } from 'react';
import s from './Button.module.scss';
import cn from 'classnames';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {}

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({ children, ...btnProps }) => {
  const { className, ...rest } = btnProps;
  return (
    <button {...rest} className={cn(s.button, className)}>
      {children}
      <div className={s.onHover}></div>
    </button>
  );
};

export default Button;
