'use client';
import React, { useEffect, useState } from 'react';
import s from './VideoPage.module.scss';
import YoutubeAPI from '../../services/api/api';
import VideoBlock from '../../components/UI/VideoBlock/VideoBlock';
import Channel from '../../components/VideoC/Channel/Channel';
import { ItemsEntity as Video } from '../../types/VideoById';
import Description from '../../components/VideoC/Description/Description';
import { Navigate, useLocation, useSearchParams } from 'react-router-dom';
import PlaylistItemsBlock from '../../components/VideoC/PlaylistItemsBlock/PlaylistItemsBlock';
import { ItemsEntity as VideoOfPlaylist } from '../../types/Videos';
import { ContentDetails, Snippet, Status } from '../../types/PlaylistItems';

export interface PlaylistBlockData2 {
  playlistItems:
    | {
        videoDuration: string | undefined;
        kind: string;
        etag: string;
        id: string;
        snippet?: Snippet | undefined;
        contentDetails?: ContentDetails | undefined;
        status?: Status | undefined;
      }[];
  playlistCreator: string | undefined;
  playlistTitle: string | undefined;
  TotalCount: number | undefined;
}
export interface PlaylistBlockData {
  playlistCreator: string | undefined;
  playlistTitle: string | undefined;
  TotalCount: number | undefined;
}

interface WatchProps {}

const VideoPage: React.FC<WatchProps> = () => {
  const [videoData, setVideoData] = useState<Video | null>(null);
  const [playlistData, setPlaylistData] = useState<PlaylistBlockData | null>(null);
  const [items, setItems] = useState<
    | {
        videoDuration: string | undefined;
        kind: string;
        etag: string;
        id: string;
        snippet?: Snippet | undefined;
        contentDetails?: ContentDetails | undefined;
        status?: Status | undefined;
      }[]
    | null
  >(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const v = searchParams.get('v');
  const list = searchParams.get('list');
  useEffect(() => {
    if (v) {
      YoutubeAPI.getVideoById({
        part: 'player,snippet,contentDetails,statistics',
        id: v || '',
      }).then(async ({ data }) => {
        if (data.items) {
          const channelData = data.items[0];
          const { data: channelInfo } = await YoutubeAPI.getChannelById({
            part: ['snippet', 'statistics'],
            id: channelData.snippet.channelId,
          });
          const newChannelData = {
            ...channelData,
            channelSnippet: channelInfo.items ? channelInfo.items[0].snippet : undefined,
            channelStatistics: channelInfo.items ? channelInfo.items[0].statistics : undefined,
          };
          setVideoData(newChannelData);
        }
      });
    }
  }, [v]);
  const getPlaylistItems = async (nextPageToken: string = '') => {
    if (list) {
      const { data: PlaylistItemsData } = await YoutubeAPI.PlaylistItems({
        playlistId: list,
        part: 'contentDetails,snippet',
        maxResults: 100,
        pageToken: nextPageToken,
      });
      const videoIdArray = PlaylistItemsData.items.map((item) => item.contentDetails?.videoId);
      const { data: VideosData } = await YoutubeAPI.getVideos({
        part: 'snippet,contentDetails,statistics',
        id: videoIdArray.join(','),
      });
      const items = PlaylistItemsData.items.map((el, idx) => {
        return {
          ...el,
          videoDuration: VideosData.items?.[idx].contentDetails.duration,
        };
      });
      return {
        data: items,
        nextPageToken: PlaylistItemsData.nextPageToken,
      };
    }
  };
  useEffect(() => {
    if (list) {
      (async () => {
        const { data: PlaylistData } = await YoutubeAPI.Playlist({
          part: 'snippet,contentDetails',
          id: list,
        });
        const finalObject = {
          playlistCreator: PlaylistData.items[0].snippet?.channelTitle,
          playlistTitle: PlaylistData.items[0].snippet?.title,
          TotalCount: PlaylistData.items[0].contentDetails?.itemCount,
        };
        setPlaylistData(finalObject);
      })();
    }
  }, [list]);
  if (!v) {
    return <Navigate to={location.state?.redirect || '/'} />;
  }
  return (
    <div className={s.wrapper}>
      <div className={s.video}>
        {videoData && (
          <>
            {/* <div dangerouslySetInnerHTML={{ __html: videoData.player.embedHtml }}></div> */}
            <VideoBlock className={s.video_cont} player={videoData.player} />
            <h1 className={s.video_title}>{videoData.snippet.title}</h1>
            <Channel videoData={videoData} />
            <Description videoData={videoData} />
          </>
        )}
      </div>

      <div className={s.recomendations}>
        <PlaylistItemsBlock
          playlistId={list}
          getPlaylistItems={getPlaylistItems}
          currentVideoId={v}
          playlistData={playlistData}
        />
      </div>
    </div>
  );
};

export default VideoPage;
