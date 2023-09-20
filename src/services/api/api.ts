import { ChannelData } from '../../types/Channel';
import { Playlist } from '../../types/Playlist';
import { PlaylistItems } from '../../types/PlaylistItems';
import { SearchData } from '../../types/SearchData';
import { VideoData } from '../../types/VideoById';
import { VideosData } from '../../types/Videos';
import axios, { AxiosResponse } from 'axios';

export type VideosParts =
  | 'contentDetails'
  | 'fileDetails'
  | 'id'
  | 'liveStreamingDetails'
  | 'localizations'
  | 'player'
  | 'processingDetails'
  | 'recordingDetails'
  | 'snippet'
  | 'statistics'
  | 'status'
  | 'suggestions'
  | 'topicDetails';

export const instance = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    // client_id: process.env.REACT_APP_CLIENT_ID,
    key: process.env.REACT_APP_API_KEY,
    // part: 'snippet,contentDetails,statistics',
  },
});
// instance.interceptors.request.use((config) => {
//   config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
//   return config;
// });
const YoutubeAPI = {
  getVideos: (params: any) => {
    return instance.get<VideosData>(`/videos`, {
      params: {
        regionCode: 'RU',
        ...params,
      },
    });
  },
  getVideoById: (params: any) => {
    return instance.get<VideoData>(`/videos`, {
      params: {
        maxHeight: 530,
        ...params,
      },
    });
  },
  getChannelById: ({ part, id }: { part: VideosParts[]; id: string }) => {
    return instance.get<ChannelData>(`/channels?part=${part.join(',')}&id=${id}`);
  },
  Search: (params: any) => {
    return instance.get<SearchData>('/search', {
      params: {
        maxResults: '20',
        ...params,
      },
    });
  },
  Playlist: (params: any) => {
    return instance.get<Playlist>('/playlists', {
      params: {
        ...params,
      },
    });
  },
  PlaylistItems: (params: any) => {
    return instance.get<PlaylistItems>('/playlistItems', {
      params: {
        ...params,
      },
    });
  },
};

export default YoutubeAPI;
