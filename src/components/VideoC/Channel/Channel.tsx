import React from 'react';
import s from './Channel.module.scss';
import Avatar from '../../UI/VideoAva/Avatar';
import { ItemsEntity as Video } from '../../../types/VideoById';
import { formatNumber } from '../../../utils/formatNumber';
import { Link } from 'react-router-dom';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';

interface ChannelProps {
  videoData: Video | null;
}
const Channel: React.FC<ChannelProps> = ({ videoData }) => {
  return (
    <div className={s.channel}>
      <div className={s.left}>
        <div className={s.channel_info}>
          <Avatar
            className={s.channel_info_ava}
            imageData={videoData?.channelSnippet?.thumbnails.default || null}
            alt="channel avatar"
          />
          <div className={s.channel_info_text}>
            <Link className={s.channel_info_name} to={`/${videoData?.snippet.channelTitle}`}>
              <h2>{videoData?.snippet.channelTitle}</h2>
            </Link>
            <h3 className={s.channel_info_subsCount}>
              {videoData?.channelStatistics &&
                `${formatNumber(videoData?.channelStatistics?.subscriberCount)} подписчиков`}
            </h3>
          </div>
        </div>
        <button className={s.channel_subscribe}>Подписаться</button>
      </div>
      <div className={s.right}>
        <div className={s.channel_likeOrDislike}>
          <button className={s.channel_likeOrDislike_like}>
            <AiOutlineLike className={s.channel_likeOrDislike_icon} />

            {videoData?.statistics.likeCount && formatNumber(videoData.statistics.likeCount)}
          </button>
          <button className={s.channel_likeOrDislike_dislike}>
            <AiOutlineDislike className={s.channel_likeOrDislike_icon} />
          </button>
        </div>
        <div className={s.channel_share}></div>
        <div className={s.channel_else}></div>
      </div>
    </div>
  );
};

export default Channel;
