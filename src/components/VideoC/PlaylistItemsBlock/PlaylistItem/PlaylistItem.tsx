import React, { useEffect, useRef } from 'react';
import s from './PlaylistItem.module.scss';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { DefaultOrMediumOrHighOrStandardOrMaxres as VideoThumb } from '../../../../types/Videos';
import ResponceImg from '../../../UI/ResponceImg/ResponceImg';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { IoTriangleSharp } from 'react-icons/io5';
import formatDuration from 'date-fns/formatDuration';
import { formatVideoDuration } from '../../../../utils/formatVideoDuration';

interface PlaylistItemProps {
  duration: string | undefined;
  videoPrev: VideoThumb | undefined;
  title: string | undefined;
  channelTitle: string | undefined;
  isSelected: boolean;
  orderNumber: number | undefined;
  videoId: string | undefined;
  containerRef: React.RefObject<HTMLDivElement>;
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({
  duration,
  videoPrev,
  title,
  channelTitle,
  isSelected,
  videoId,
  orderNumber,
  containerRef,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const playlistItemRef = useRef<HTMLDivElement | null>(null);
  const setNextVideo = () => {
    setSearchParams((sParams) => {
      sParams.set('v', videoId || '');
      return sParams;
    });
  };
  const formattedDuration = duration && formatVideoDuration(duration);
  useEffect(() => {
    if (isSelected) {
      setSearchParams((Sparams) => {
        orderNumber && Sparams.set('idx', orderNumber.toString());
        return Sparams;
      });
      if (playlistItemRef.current) {
        containerRef.current?.scrollTo({
          top: playlistItemRef.current.offsetTop - 300,
        });
      }
    }
  }, [isSelected]);
  return (
    <div
      ref={playlistItemRef}
      onClick={setNextVideo}
      className={cn(s.playlistItem, { [s.playlistItem_selected]: isSelected })}>
      <div className={s.playlistItem_orderNumber}>
        {!isSelected ? orderNumber : <IoTriangleSharp style={{ transform: 'rotate(90deg)' }} />}
      </div>

      <div className={s.playlistItem_imgWrapper}>
        <ResponceImg className={s.playlistItem_image} src={videoPrev?.url} />
        <div className={s.playlistItem_time}>{formattedDuration}</div>
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
