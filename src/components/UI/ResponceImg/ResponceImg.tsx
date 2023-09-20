import React, { ComponentPropsWithoutRef } from 'react';
import s from './ResponceImg.module.scss';
import cn from 'classnames';

interface ResponceImgProps extends ComponentPropsWithoutRef<'img'> {
  wrapperStyles?: React.CSSProperties;
}

const ResponceImg: React.FC<ResponceImgProps> = ({
  wrapperStyles = undefined,
  className,
  ...rest
}) => {
  return (
    <div className={s.img_wrapper} style={wrapperStyles}>
      <img className={className ? className : s.img} {...rest} />
    </div>
  );
};
export default ResponceImg;
