import React from 'react';
import s from './ChannelResultItem.module.scss';
import { DefaultOrMediumOrHigh as ChannelImage } from '../../../types/Channel';
import { Link } from 'react-router-dom';
import ResponceImg from '../../UI/ResponceImg/ResponceImg';
import mockImg from '../../../assets/static/mockVideoAva.jpg';
import { formatNumber } from '../../../utils/formatNumber';
interface ChannelResultItemProps {
  desc: string;
  title: string;
  channelImg: ChannelImage;
  subsCount: string;
  customUrl: string;
}

const ChannelResultItem: React.FC<ChannelResultItemProps> = ({
  desc,
  title,
  channelImg,
  subsCount,
  customUrl,
}) => {
  return (
    <Link to={`/${customUrl}`} className={s.wrapper}>
      <div className={s.channelImage}>
        <img
          draggable={false}
          className={s.channelImage_image}
          src={channelImg.url}
          alt={title}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = mockImg;
          }}
        />
      </div>
      <div className={s.infoBlock}>
        <div className={s.info}>
          <h2 className={s.info_title}>{title}</h2>
          <div className={s.info_details}>
            {customUrl} &bull; {formatNumber(subsCount)} подписчиков
          </div>
          <p className={s.info_desc}>{desc}</p>
        </div>
        <button className={s.subscribe}>Подписаться</button>
      </div>
    </Link>
  );
};

export default ChannelResultItem;
