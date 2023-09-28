import React from 'react';
import s from './PlaylistClosed.module.scss';
import { LiaAngleDownSolid } from 'react-icons/lia';
import Button from '../../../UI/Button/Button';
import SolidCircleLoader from '../../../UI/solidCircleLoader/SolidCircleLoader';

interface PlaylistClosedProps {
  setOpen: () => void;
  playlistTitle: string | undefined;
  nextItemTitle: string;
  totalCount: number | undefined;
  currentItemPosition: number;
  isItemsLoading: boolean;
}

const PlaylistClosed: React.FC<PlaylistClosedProps> = ({
  setOpen,
  playlistTitle,
  nextItemTitle,
  totalCount,
  currentItemPosition,
  isItemsLoading,
}) => {
  return (
    <div className={s.playlistblock}>
      <div className={s.playlistblock_info}>
        <div className={s.playlistblock_nextItemTitle}>Далее: {nextItemTitle}</div>
        <div className={s.playlistblock_playlistTitleAndCount}>
          <span className={s.playlistblock_playlistTitle}>{playlistTitle}</span> -{' '}
          {!isItemsLoading ? (
            `${currentItemPosition === 0 ? '?' : currentItemPosition} видео из ${totalCount}`
          ) : (
            <SolidCircleLoader className={s.playlistblock_itemsCountLoader} />
          )}
        </div>
      </div>
      <Button onClick={setOpen} className={s.playlistblock_openButton}>
        <LiaAngleDownSolid size={20} />
      </Button>
    </div>
  );
};

export default PlaylistClosed;
