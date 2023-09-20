import React, { useRef } from 'react';
import s from './PlaylistItemsBlock.module.scss';
import Button from '../../UI/Button/Button';
import { GrClose } from 'react-icons/gr';
import { FaRandom } from 'react-icons/fa';
import { BsRepeat, BsRepeat1, BsThreeDotsVertical } from 'react-icons/bs';
import { ItemsEntity as VideoOfPlaylist } from '../../../types/Videos';
import PlaylistItem from './PlaylistItem/PlaylistItem';
import { PlaylistBlockData } from '../../../pages/VideoPage/VideoPage';
import {
  ContentDetails as PIContentDetails,
  Snippet as PISnippet,
  Status as PIStatus,
} from '../../../types/PlaylistItems';
import { useScrollPagination } from '../../../hooks/useScrollPagination';

export type PlaylistItem = {
  videoDuration: string | undefined;
  kind: string;
  etag: string;
  id: string;
  snippet?: PISnippet | undefined;
  contentDetails?: PIContentDetails | undefined;
  status?: PIStatus | undefined;
};

interface PlaylistItemsBlockProps {
  playlistData: PlaylistBlockData | null;
  currentVideoId: string;
  getPlaylistItems: (nextPageToken?: string) => Promise<
    | {
        data: PlaylistItem[];
        nextPageToken: string | undefined;
      }
    | undefined
  >;
  playlistId: string | null;
}

const PlaylistItemsBlock: React.FC<PlaylistItemsBlockProps> = ({
  playlistData,
  currentVideoId,
  getPlaylistItems,
  playlistId,
}) => {
  const itemsDiv = useRef<HTMLDivElement>(null);
  const [items, isLoading, error] = useScrollPagination<PlaylistItem[]>(
    [],
    getPlaylistItems,
    [playlistId],
    itemsDiv,
  );
  console.log(items, isLoading);
  const playlistElements = items?.map((video, idx) => {
    return (
      <PlaylistItem
        orderNumber={idx + 1}
        isSelected={video.contentDetails?.videoId === currentVideoId}
        videoPrev={video.snippet?.thumbnails.medium}
        channelTitle={video.snippet?.videoOwnerChannelTitle}
        title={video.snippet?.title}
        duration={video.videoDuration}
        videoId={video.contentDetails?.videoId}
      />
    );
  });
  return (
    <div className={s.playlistblock}>
      <div className={s.playlistblock_header}>
        <div className={s.playlistblock_upperBlock}>
          <div className={s.playlistblock_text}>
            <h2 className={s.playlistblock_title}>{playlistData?.playlistTitle}</h2>
            <h3 className={s.playlistblock_authorAndCount}>
              {playlistData?.playlistCreator} - {`1 видео из ${playlistData?.TotalCount}`}
            </h3>
          </div>
          <Button>
            <GrClose className={s.cross} size={22} />
          </Button>
        </div>
        <div className={s.playlistblock_settingsBlock}>
          <div className={s.playlistblock_playlistSettings}>
            <Button>
              <FaRandom size={20} />
            </Button>
            <Button>
              <BsRepeat size={20} />
            </Button>
            {/* <BsRepeat1/> */}
          </div>
          <Button>
            <BsThreeDotsVertical size={20} />
          </Button>
        </div>
      </div>
      <div onScroll={(e) => {}} ref={itemsDiv} className={s.playlistblock_playlistItems}>
        {playlistElements}
      </div>
    </div>
  );
};

export default PlaylistItemsBlock;
