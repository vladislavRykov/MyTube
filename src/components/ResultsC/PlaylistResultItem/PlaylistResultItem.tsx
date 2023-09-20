import React, { useState } from 'react';
import { format } from 'date-fns/esm';
import { formatDuration } from 'date-fns/esm';
import { formatDistanceToNow } from 'date-fns/esm';
import { Link, useLocation } from 'react-router-dom';
import Avatar from '../../UI/VideoAva/Avatar';
import { formatNumber } from '../../../utils/formatNumber';
import RU from 'date-fns/locale/ru';
import s from './PlaylistResultItem.module.scss';
import ResponceImg from '../../UI/ResponceImg/ResponceImg';
import { Default as PlaylistThumbnail } from '../../../types/Playlist';
import { BiSolidRightArrow } from 'react-icons/bi';
import { MdPlaylistPlay } from 'react-icons/md';

interface PlaylistResultItemProps {
  videoPrev: PlaylistThumbnail | undefined;
  title: string | undefined;
  author: string | undefined;
  date: any;
  id: string | undefined | null;
  desc: string | undefined;
  videosCount: number | undefined;
  channelUrl: string | null;
  firstVideoId: string | undefined;
}

const PlaylistResultItem: React.FC<PlaylistResultItemProps> = ({
  videoPrev,
  title,
  author,
  id,
  desc,
  channelUrl,
  videosCount,
  firstVideoId,
}) => {
  const { pathname } = useLocation();
  return (
    <Link
      to={`/watch?v=${firstVideoId}&list=${id}`}
      state={{ redirect: pathname }}
      className={s.videoItem}>
      <div className={s.videoItem_prevBlock}>
        <div className={s.videoItem_img_wrapper}>
          <ResponceImg
            draggable={false}
            className={s.videoItem_img}
            src={videoPrev?.url}
            alt={title}
          />
          <div className={s.videoItem_img_count}>
            <MdPlaylistPlay size={18} />
            <span>
              {videosCount ? `${formatNumber(videosCount.toString())} видео` : 'Плейлист'}
            </span>
          </div>
          <div className={s.videoItem_img_hover}>
            <span className={s.videoItem_img_hover_text}>
              <BiSolidRightArrow size={18} />
              Воспроизвести все
            </span>
          </div>
        </div>
      </div>
      <div className={s.videoItem_infoBlock}>
        <h2 className={s.videoItem_title}>{title}</h2>
        <Link to={`/${channelUrl}`} className={s.videoItem_author}>
          <p className={s.author_nickname}>{author}</p>
        </Link>
        <p className={s.videoItem_desc}>{desc}</p>
      </div>
    </Link>
  );
};

export default PlaylistResultItem;
