import React from 'react';
import s from './PlaylistItem.module.scss';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { DefaultOrMediumOrHighOrStandardOrMaxres as VideoThumb } from '../../../../types/Videos';
import ResponceImg from '../../../UI/ResponceImg/ResponceImg';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { IoTriangleSharp } from 'react-icons/io5';

interface PlaylistItemProps {
  duration: string | undefined;
  videoPrev: VideoThumb | undefined;
  title: string | undefined;
  channelTitle: string | undefined;
  isSelected: boolean;
  orderNumber: number | undefined;
  videoId: string | undefined;
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({
  duration,
  videoPrev,
  title,
  channelTitle,
  isSelected,
  videoId,
  orderNumber,
}) => {
  console.log(isSelected);
  const [searchParams, setSearchParams] = useSearchParams();
  const setNextVideo = () => {
    setSearchParams((sParams) => {
      sParams.set('v', videoId || '');
      return sParams;
    });
  };
  const timeArray = duration?.match(/(\d+)(?=[MHS])/gi) || [];
  const formatted = timeArray
    .map((item, idx) => {
      if (timeArray.length === 1) return `0:${item.length < 2 ? '0' + item : item}`;
      if (timeArray.length >= 3 && idx === 0) return item;
      if (item.length < 2) return '0' + item;
      return item;
    })
    .join(':');
  return (
    <div
      onClick={setNextVideo}
      className={cn(s.playlistItem, { [s.playlistItem_selected]: isSelected })}>
      <div className={s.playlistItem_orderNumber}>
        {!isSelected ? orderNumber : <IoTriangleSharp style={{ transform: 'rotate(90deg)' }} />}
      </div>

      <div className={s.playlistItem_imgWrapper}>
        <ResponceImg className={s.playlistItem_image} src={videoPrev?.url} />
        <div className={s.playlistItem_time}>{formatted}</div>
      </div>
      <div className={s.playlistItem_text}>
        <h2 className={s.playlistItem_title}>{title}</h2>
        <h2 className={s.playlistItem_author}>{channelTitle}</h2>
      </div>
      {/* <BsThreeDotsVertical /> */}
    </div>
  );
};

export default PlaylistItem;
