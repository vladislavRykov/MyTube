import React, { ComponentPropsWithoutRef } from 'react';
import loaderImg from '../../../assets/static/solidCircleLoader.gif';
interface SolidCircleLoaderProps extends Omit<ComponentPropsWithoutRef<'img'>, 'src'> {}

const SolidCircleLoader: React.FC<SolidCircleLoaderProps> = ({ ...props }) => {
  return <img src={loaderImg} {...props} />;
};

export default SolidCircleLoader;
