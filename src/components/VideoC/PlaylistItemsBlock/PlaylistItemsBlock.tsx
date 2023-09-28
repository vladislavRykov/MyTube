import React, { useRef, useState } from 'react';
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
import SolidCircleLoader from '../../UI/solidCircleLoader/SolidCircleLoader';
import PlaylistClosed from './PlaylistClosed/PlaylistClosed';
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
        TotalCount: number;
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
  const [isPlaylistOpen, setIsPlayistOpen] = useState(true);
  const itemsDiv = useRef<HTMLDivElement>(null);
  const [items, isLoading, error] = useScrollPagination<PlaylistItem[]>(
    [],
    getPlaylistItems,
    [playlistId],
    { scrollItem: itemsDiv, scrollDeps: [isPlaylistOpen] },
  );
  const selectedNumber =
    items.findIndex((item) => item.contentDetails?.videoId === currentVideoId) + 1;
  const playlistElements = items?.map((video, idx) => {
    return (
      <PlaylistItem
        containerRef={itemsDiv}
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
    <>
      {isPlaylistOpen ? (
        <div className={s.playlistblock}>
          <div className={s.playlistblock_header}>
            <div className={s.playlistblock_upperBlock}>
              <div className={s.playlistblock_text}>
                <h2 className={s.playlistblock_title}>{playlistData?.playlistTitle}</h2>
                <h3 className={s.playlistblock_authorAndCount}>
                  {playlistData?.playlistCreator} -{' '}
                  {!isLoading && selectedNumber !== 0 ? (
                    `${selectedNumber} видео из ${playlistData?.TotalCount}`
                  ) : (
                    <SolidCircleLoader className={s.playlistblock_itemsCountLoader} />
                  )}
                </h3>
              </div>
              <Button onClick={() => setIsPlayistOpen(false)}>
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
            {isLoading && (
              <div className={s.playlistblock_itemLoader_wrapper}>
                <SolidCircleLoader className={s.playlistblock_itemLoader} />
              </div>
            )}
          </div>
        </div>
      ) : (
        <PlaylistClosed
          nextItemTitle="Nier"
          isItemsLoading={isLoading}
          currentItemPosition={selectedNumber}
          totalCount={playlistData?.TotalCount}
          playlistTitle={playlistData?.playlistTitle}
          setOpen={() => setIsPlayistOpen(true)}
        />
      )}
    </>
  );
};

export default PlaylistItemsBlock;
