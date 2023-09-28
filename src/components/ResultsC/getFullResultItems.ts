import YoutubeAPI from '../../services/api/api';
import { Thumbnails as ChannelThumbnails, ItemsEntity as ChannelItem } from '../../types/Channel';
import { ResultKinds } from '../../types/Common';
import {
  ContentDetails as PlaylistContentDetails,
  Snippet as PlaylistSnippet,
} from '../../types/Playlist';
import {
  ContentDetails as VideoContentDetails,
  Snippet as VideoSnippet,
  Statistics as VideoStatistics,
} from '../../types/Videos';

interface getFullResultItemsProps {
  VideoIdArray: (string | null | undefined)[];
  itemOrderArray: string[];
  isThereVideo: boolean;
  isThereChannel: boolean;
  isTherePlaylist: boolean;
}
export type Playlist = {
  firstVideoId: string | undefined;
  channelTumbnail: ChannelThumbnails | null;
  customUrl: string | null;
  kind: string;
  etag: string;
  id: string;
  snippet?: PlaylistSnippet;
  contentDetails?: PlaylistContentDetails;
};
export type Channel = ChannelItem;
export type Video = {
  channelTumbnail: ChannelThumbnails | null;
  customUrl: string | null;
  kind: string;
  etag: string;
  id: string;
  snippet: VideoSnippet;
  contentDetails: VideoContentDetails;
  statistics: VideoStatistics;
};

export const getFullResultItems = async (obj: getFullResultItemsProps) => {
  const stringOfIds = obj.VideoIdArray.join(',');
  let playlists: Playlist[] | null = null,
    channels: Channel[] | null = null,
    videos: Video[] | null = null;
  let totalCount = 0;
  if (obj.isThereVideo) {
    const { data: VideosData } = await YoutubeAPI.getVideos({
      part: 'snippet,contentDetails,statistics',
      id: stringOfIds,
      maxResults: 16,
    });
    const channelsOfVideos = VideosData?.items?.map((video) => video.snippet.channelId);
    const { data: ChannelData } = await YoutubeAPI.getChannelById({
      part: ['snippet', 'statistics'],
      id: channelsOfVideos?.join(',') || '',
    });

    const result = VideosData.items?.map((video, idx) => {
      const findedChannel = ChannelData.items?.find(
        (channel) => channel.id === video.snippet.channelId,
      );
      return {
        ...video,
        channelTumbnail: findedChannel?.snippet.thumbnails || null,
        customUrl: findedChannel?.snippet.customUrl || null,
      };
    });
    videos = result || null;
    totalCount += VideosData.items?.length || 0;
  }
  if (obj.isTherePlaylist) {
    const { data: PlaylistData } = await YoutubeAPI.Playlist({
      part: 'snippet,contentDetails',
      id: stringOfIds,
    });
    const channelsOfPlaylists = PlaylistData.items.map((playlist) => playlist.snippet?.channelId);
    const { data: ChannelData } = await YoutubeAPI.getChannelById({
      part: ['snippet', 'statistics'],
      id: channelsOfPlaylists.join(','),
    });
    const result = PlaylistData.items.map(async (playlist, idx) => {
      const findedChannel = ChannelData.items?.find(
        (channel) => channel.id === playlist.snippet?.channelId,
      );
      const { data: PlaylistItemsData } = await YoutubeAPI.PlaylistItems({
        part: 'contentDetails',
        playlistId: playlist.id,
        maxResults: 1,
      });
      return {
        ...playlist,
        channelTumbnail: findedChannel?.snippet.thumbnails || null,
        customUrl: findedChannel?.snippet.customUrl || null,
        firstVideoId: PlaylistItemsData.items[0].contentDetails?.videoId,
      };
    });
    playlists = (await Promise.all(result)) || null;
    totalCount += PlaylistData.items?.length || 0;
  }
  if (obj.isThereChannel) {
    const { data: ChannelData } = await YoutubeAPI.getChannelById({
      part: ['snippet', 'statistics'],
      id: stringOfIds,
    });
    channels = ChannelData.items || null;
    totalCount += ChannelData.items?.length || 0;
  }
  // const results = obj.itemOrderArray.map((kind) => {
  //   let playlistIdx = 0,
  //     videoIdx = 0,
  //     channelIdx = 0;
  //   switch (kind) {
  //     case ResultKinds.Video:
  //       return videos?.[videoIdx++];
  //     case ResultKinds.Playlist:
  //       return playlists?.[playlistIdx++];
  //     case ResultKinds.Channel:
  //       return channels?.[channelIdx++];
  //   }
  // });
  return {
    results: {
      playlists,
      channels,
      videos,
    },
    itemOrderArray: obj.itemOrderArray,
    totalCount,
  };
  // return {
  //   results,
  //   totalCount: totalCount,
  // };
};
