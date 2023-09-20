import React, { useState } from 'react';
import { format } from 'date-fns/esm';
import { formatDuration } from 'date-fns/esm';
import { formatDistanceToNow } from 'date-fns/esm';
import { Link, useLocation } from 'react-router-dom';
import Avatar from '../../UI/VideoAva/Avatar';
import { formatNumber } from '../../../utils/formatNumber';
import RU from 'date-fns/locale/ru';
import mockAva from '../../../assets/static/mockVideoAva.jpg';
import s from './VideoResultItem.module.scss';
import ResponceImg from '../../UI/ResponceImg/ResponceImg';
import { ResultKinds } from '../../../types/Common';
import { DefaultOrMediumOrHighOrStandardOrMaxres as Tumbnail } from '../../../types/Videos';
import { DefaultOrMediumOrHigh as ChannelThumbnail } from '../../../types/Channel';

interface VideoResultItemProps {
  videoPrev: Tumbnail | undefined;
  title: string | undefined;
  author: string | undefined;
  channelImg: ChannelThumbnail | null | undefined;
  date: any;
  viewsCount: string | undefined;
  duration: string | undefined;
  id: string | undefined | null;
  desc: string | undefined;
  channelUrl: string | null;
}

const VideoResultItem: React.FC<VideoResultItemProps> = ({
  videoPrev,
  title,
  author,
  date,
  duration,
  viewsCount,
  channelUrl,
  id,
  channelImg,
  desc,
}) => {
  const { pathname } = useLocation();
  const timeArray = (duration && duration.match(/(\d+)(?=[MHS])/gi)) || [];
  const formatted = timeArray
    .map((item, idx) => {
      if (timeArray.length >= 3 && idx === 0) return item;
      if (item.length < 2) return '0' + item;
      return item;
    })
    .join(':');

  return (
    <Link to={`/watch?v=${id}`} state={{ redirect: pathname }} className={s.videoItem}>
      <div className={s.videoItem_prevBlock}>
        <div className={s.videoItem_img_wrapper}>
          <ResponceImg
            draggable={false}
            className={s.videoItem_img}
            src={videoPrev?.url}
            alt={title}
          />
          <span className={s.videoItem_duration}>{formatted}</span>
        </div>
      </div>
      <div className={s.videoItem_infoBlock}>
        <h2 className={s.videoItem_title}>{title}</h2>
        <div className={s.videoItem_details}>
          {viewsCount && formatNumber(viewsCount)} просмотров &bull;{' '}
          {formatDistanceToNow(new Date(date), {
            locale: RU,
          })}{' '}
          назад
        </div>
        <Link to={`/${channelUrl}`} className={s.videoItem_author}>
          <Avatar className={s.author_ava} imageData={channelImg} alt="author img" />
          <p className={s.author_nickname}>{author}</p>
        </Link>
        <p className={s.videoItem_desc}>{desc}</p>
      </div>
    </Link>
  );
};

export default VideoResultItem;
