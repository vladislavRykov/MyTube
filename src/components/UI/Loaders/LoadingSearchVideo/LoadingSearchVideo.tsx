import React from 'react';
import ContentLoader from 'react-content-loader';

const LoadingSearchVideo = (props: any) => (
  <ContentLoader
    speed={1.5}
    width={725}
    height={212}
    viewBox="0 0 725 212"
    backgroundColor="#d9d9d9"
    foregroundColor="#ffffff"
    {...props}>
    <rect x="5" y="5" rx="12" ry="12" width="360" height="202" />
    <rect x="370" y="10" rx="0" ry="0" width="350" height="18" />
    <rect x="370" y="31" rx="0" ry="0" width="170" height="12" />
    <circle cx="382" cy="67" r="12" />
    <rect x="399" y="61" rx="0" ry="0" width="60" height="12" />
    <rect x="370" y="91" rx="0" ry="0" width="250" height="12" />
  </ContentLoader>
);

export default LoadingSearchVideo;
