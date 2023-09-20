import React, { useState } from 'react';
import mockImg from '../../../public/static/images/mockVideoAva.jpg';
import s from './VideoItem.module.scss';
import { format } from 'date-fns/esm';
import { formatDuration } from 'date-fns/esm';
import { formatDistanceToNow } from 'date-fns/esm';
import { Link, useLocation } from 'react-router-dom';
import Avatar from '../../UI/VideoAva/Avatar';
import { formatNumber } from '../../../utils/formatNumber';
import RU from 'date-fns/locale/ru';
import ResponceImg from '../../UI/ResponceImg/ResponceImg';

interface VideoItemProps {
  videoPrev: {
    height: number;
    url: string;
    width: number;
  };
  title: string;
  author: string;
  channelImg: {
    height: number;
    url: string;
    width: number;
  };
  date: any;
  viewsCount: string;
  duration: string;
  id: string;
}

const VideoItem: React.FC<VideoItemProps> = ({
  videoPrev,
  title,
  author,
  date,
  duration,
  viewsCount,
  id,
  channelImg,
}) => {
  const { pathname } = useLocation();
  const timeArray = duration.match(/(\d+)(?=[MHS])/gi) || [];
  const formatted = timeArray
    .map((item, idx) => {
      if (timeArray.length === 1) return `0:${item.length < 2 ? '0' + item : item}`;
      if (timeArray.length >= 3 && idx === 0) return item;
      if (item.length < 2) return '0' + item;
      return item;
    })
    .join(':');
  return (
    <Link
      to={`/watch?v=${id}`}
      state={{ redirect: pathname }}
      style={{ width: videoPrev.width + 'px' }}
      className={s.videoItem}>
      <div className={s.videoItem_prevBlock}>
        {/* <img
          className={s.videoItem_img}
          src={videoPrev.url}
          alt={title}
          width={videoPrev.width}
          height={videoPrev.height}
        /> */}
        <ResponceImg
          draggable={false}
          className={s.videoItem_img}
          src={videoPrev.url}
          alt={title}
          width={videoPrev.width}
          height={videoPrev.height}
        />
        <span className={s.videoItem_duration}>{formatted}</span>
      </div>
      <div className={s.videoItem_infoBlock}>
        <Avatar className={s.videoItem_ava} imageData={channelImg} alt="author img" />
        <div className={s.videoItem_text}>
          <h2 className={s.videoItem_text_title}>{title}</h2>
          <div className={s.videoItem_text_info}>
            <p className={s.videoItem_text_author}>{author}</p>
            <span className={s.videoItem_text_meta}>
              {formatNumber(viewsCount)} просмотров &bull;{' '}
              {formatDistanceToNow(new Date(date), {
                locale: RU,
              })}{' '}
              назад
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoItem;
