import React, { useState } from 'react';
import s from './Description.module.scss';
import { ItemsEntity as Video } from '../../../types/VideoById';
import { formatNumber } from './../../../utils/formatNumber';
import { formatDistanceToNow } from 'date-fns/esm';
import RU from 'date-fns/locale/ru';
import cn from 'classnames';

interface DescriptionProps {
  videoData: Video | null;
}

const Description: React.FC<DescriptionProps> = ({ videoData }) => {
  const [isDescOpen, setIsDescOpen] = useState(false);
  return (
    <div
      onClick={() => !isDescOpen && setIsDescOpen(true)}
      className={cn(s.wrapper, { [s.wrapper_closedDesc]: !isDescOpen })}>
      <div className={s.content}>
        <div className={s.videoInfo}>
          <div>
            {videoData && `${formatNumber(videoData.statistics.viewCount)} просмотров `}
            &bull;
            {videoData &&
              `${formatDistanceToNow(new Date(videoData.snippet.publishedAt), {
                locale: RU,
              })}
          назад`}
          </div>
        </div>
        <div style={isDescOpen ? { maxHeight: 'unset' } : {}} className={s.description}>
          {videoData && videoData.snippet.description}
        </div>
        <button onClick={() => setIsDescOpen((prev) => !prev)} className={s.toggleDesc}>
          {isDescOpen ? 'Свернуть' : 'Еще'}
        </button>
      </div>
    </div>
  );
};

export default Description;
