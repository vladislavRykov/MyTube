import React, { useEffect, useState } from 'react';
import YoutubeAPI from '../../services/api/api';
import { useSearchParams } from 'react-router-dom';
import VideoResultItem from '../../components/ResultsC/VideoResultItem/VideoResultItem';
import mockImg from '../../assets/static/mockVideoAva.jpg';
import s from './ResultsPage.module.scss';
import { ItemsEntity as SearchVideoItem } from '../../types/SearchData';
import { ItemsEntity as VideoItem } from '../../types/Videos';
import { Item as PlaylistItem } from '../../types/Playlist';
import { Snippet as VideoSnippet } from '../../types/Videos';
import {
  ContentDetails as VideoContentDetails,
  Statistics as VideoStatistics,
} from './../../types/Videos';
import { useScrollPagination } from '../../hooks/useScrollPagination';
import LoadingVideo from '../../components/UI/Loaders/LoadingVideo/LoadingVideo';
import LoadingSearchVideo from '../../components/UI/Loaders/LoadingSearchVideo/LoadingSearchVideo';
import { ResultKinds } from '../../types/Common';
import PlaylistResultItem from '../../components/ResultsC/PlaylistResultItem/PlaylistResultItem';
import ChannelResultItem from '../../components/ResultsC/ChannelResultItem/ChannelResultItem';
import { Thumbnails } from '../../types/Channel';
import {
  Channel,
  Playlist,
  Video,
  getFullResultItems,
} from '../../components/ResultsC/getFullResultItems';

type ResultType = Video | Playlist | Channel | undefined;

const ResultsPage = () => {
  //Верстка.Адаптивность итемов
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search');

  const Search = async (nextPageToken?: string) => {
    if (search) {
      const searchWithoutPluses = search.split('+').join(' ');
      const { data: SearchData } = await YoutubeAPI.Search({
        part: 'snippet',
        q: searchWithoutPluses,
        pageToken: nextPageToken,
      });
      // const itemOrderArray = SearchData.items?.map((result) => result.id.kind);
      const itemsInfo = SearchData.items?.reduce(
        (
          acc: {
            VideoIdArray: (string | null | undefined)[];
            itemOrderArray: string[];
            isThereVideo: boolean;
            isThereChannel: boolean;
            isTherePlaylist: boolean;
          },
          result,
        ) => {
          const id = result.id?.videoId || result.id?.playlistId || result.id?.channelId;
          return {
            VideoIdArray: [...acc.VideoIdArray, id],
            itemOrderArray: [...acc.itemOrderArray, result.id.kind],
            isThereVideo: acc.isThereVideo ? true : result.id.kind === ResultKinds.Video,
            // isThereChannel: acc.isThereChannel ? true : result.id.kind === ResultKinds.Channel,
            isThereChannel: true,
            isTherePlaylist: acc.isTherePlaylist ? true : result.id.kind === ResultKinds.Playlist,
          };
        },
        {
          VideoIdArray: [],
          itemOrderArray: [],
          isThereVideo: false,
          isThereChannel: false,
          isTherePlaylist: false,
        },
      );
      const fullResultItems = itemsInfo && (await getFullResultItems(itemsInfo));
      console.log(fullResultItems);
      let playlistIdx = 0,
        videoIdx = 0,
        channelIdx = 0;
      const resultsItems = fullResultItems?.itemOrderArray.map((kind) => {
        switch (kind) {
          case ResultKinds.Video:
            return fullResultItems.results.videos?.[videoIdx++];

          case ResultKinds.Playlist:
            return fullResultItems.results.playlists?.[playlistIdx++];

          case ResultKinds.Channel:
            return fullResultItems.results.channels?.[channelIdx++];
        }
      });
      return {
        data: resultsItems,
        nextPageToken: SearchData.nextPageToken,
      };
    } else {
      setSearchParams((prevParams) => {
        searchParams.set('search', '');
        return prevParams;
      });
    }
  };
  // const SearchFunc = async (nextPageToken?: string) => {
  //   if (search) {
  //     const searchWithoutPluses = search.split('+').join(' ');
  //     const { data: SearchData } = await YoutubeAPI.Search({
  //       part: 'snippet',
  //       q: searchWithoutPluses,
  //       pageToken: nextPageToken,
  //     });
  //     const searchItems = SearchData.items?.map(async (result) => {
  //       const id = result.id?.videoId || result.id?.playlistId || result.id?.channelId;
  //       let additionalData:
  //         | (VideoItem & { channelImg: Thumbnails | null })
  //         | PlaylistItem
  //         | null
  //         | undefined;
  //       if (result.id.kind === ResultKinds.Video) {
  //         const { data: VideosData } = await YoutubeAPI.getVideos({
  //           part: 'snippet,contentDetails,statistics',
  //           id,
  //         });
  //         const { data: ChannelData } = await YoutubeAPI.getChannelById({
  //           part: ['snippet', 'statistics'],
  //           id: result.snippet.channelId,
  //         });
  //         const PreData = VideosData?.items?.[0] && {
  //           channelImg: ChannelData?.items?.[0].snippet.thumbnails || null,
  //           ...VideosData?.items?.[0],
  //         };
  //         console.log(ChannelData);
  //         additionalData = PreData || null;
  //       } else if (result.id.kind === ResultKinds.Channel) {
  //       } else {
  //         const { data: PlaylistData } = await YoutubeAPI.Playlist({
  //           part: 'snippet,contentDetails',
  //           id,
  //         });
  //         additionalData = PlaylistData?.items?.[0] || null;
  //       }
  //       if (!additionalData) {
  //         return result;
  //       }
  //       return {
  //         ...additionalData,
  //         ...result,
  //       };
  //     });
  //     // if (!searchItems) {
  //     //   return {
  //     //     data: [],
  //     //     nextPageToken: null,
  //     //   };
  //     // }
  //     const awaitedVideos = searchItems ? await Promise.all(searchItems) : [];
  //     return {
  //       data: awaitedVideos,
  //       nextPageToken: SearchData.nextPageToken,
  //     };
  //   } else {
  //     setSearchParams((prevParams) => {
  //       searchParams.set('search', '');
  //       return prevParams;
  //     });
  //   }
  // };
  const [results, isLoading, error] = useScrollPagination<
    (Video | Playlist | Channel | undefined)[] | undefined
  >([], Search, [search]);

  const resultsItems = results?.map((result) => {
    switch (result?.kind) {
      case ResultKinds.Video:
        const video = result as Video;
        return (
          <VideoResultItem
            videoPrev={video?.snippet.thumbnails.high}
            channelUrl={video.customUrl}
            title={video?.snippet.title}
            author={video?.snippet.channelTitle}
            channelImg={video?.channelTumbnail?.high}
            date={video?.snippet.publishedAt}
            id={video?.id}
            duration={video?.contentDetails.duration}
            viewsCount={video?.statistics?.viewCount}
            desc={video?.snippet.description}
          />
        );
      case ResultKinds.Playlist:
        const playlist = result as Playlist;

        return (
          <PlaylistResultItem
            videosCount={playlist?.contentDetails?.itemCount}
            channelUrl={playlist.customUrl}
            videoPrev={playlist?.snippet?.thumbnails.high}
            title={playlist?.snippet?.title}
            author={playlist?.snippet?.channelTitle}
            date={playlist?.snippet?.publishedAt}
            id={playlist?.id}
            desc={playlist?.snippet?.description}
            firstVideoId={playlist.firstVideoId}
          />
        );
      case ResultKinds.Channel:
        const channel = result as Channel;
        return (
          <ChannelResultItem
            desc={channel.snippet.description}
            title={channel.snippet.title}
            channelImg={channel.snippet.thumbnails.medium}
            subsCount={channel.statistics.subscriberCount}
            customUrl={channel.snippet.customUrl}
          />
        );
    }
  });
  const LoadingVideos = Array(10)
    .fill(1)
    .map((el) => <LoadingSearchVideo />);
  return (
    //Разные типы в массиве...думай че сделать можно
    <div className={s.wrapper}>
      {resultsItems?.length === 0 && !error && !isLoading ? (
        <div>Нет результатов</div>
      ) : (
        resultsItems
      )}
      {error && <div>Произошла ошибка. Проверте подключение к интернету.</div>}
      {isLoading && LoadingVideos}
    </div>
  );
};

export default ResultsPage;
