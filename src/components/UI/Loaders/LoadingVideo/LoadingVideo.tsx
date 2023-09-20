import s from './LoadingVideo.module.scss';
import React from 'react';
import ContentLoader from 'react-content-loader';

const LoadingVideo = (props: any) => {
  return (
    <ContentLoader
      speed={1.5}
      width={320}
      height={270}
      viewBox="0 0 320 270"
      backgroundColor="#d9d9d9"
      foregroundColor="#ffffff"
      {...props}>
      <rect x="4" y="4" rx="15" ry="15" width="312" height="180" />
      <rect x="40" y="190" rx="0" ry="0" width="272" height="30" />
      <rect x="4" y="190" rx="100" ry="100" width="30" height="30" />
      <rect x="40" y="226" rx="0" ry="0" width="162" height="15" />
      <rect x="40" y="247" rx="0" ry="0" width="220" height="14" />
    </ContentLoader>
  );
};

export default LoadingVideo;
