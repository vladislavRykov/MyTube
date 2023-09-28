import React, { useEffect, useState } from 'react';
import YoutubeAPI from '../../services/api/api';
import { useSearchParams } from 'react-router-dom';
import VideoResultItem from '../../components/ResultsC/VideoResultItem/VideoResultItem';
import s from './ResultsPage.module.scss';
import { useScrollPagination } from '../../hooks/useScrollPagination';
import LoadingSearchVideo from '../../components/UI/Loaders/LoadingSearchVideo/LoadingSearchVideo';
import { ResultKinds } from '../../types/Common';
import PlaylistResultItem from '../../components/ResultsC/PlaylistResultItem/PlaylistResultItem';
import ChannelResultItem from '../../components/ResultsC/ChannelResultItem/ChannelResultItem';
import {
  Channel,
  Playlist,
  Video,
  getFullResultItems,
} from '../../components/ResultsC/getFullResultItems';
import Filters from '../../components/ResultsC/Filters/Filters';
import { SearchQueryObj } from '../../types/Common';
import { convertFiltersToSearchApiObj } from '../../components/ResultsC/Filters/convertFiltersToSearchApiObj';
import ErrorPage from '../../components/UI/ErrorPage/ErrorPage';

type ResultType = Video | Playlist | Channel | undefined;

const ResultsPage = () => {
  //Верстка.Адаптивность итемов
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search');
  const queryString = searchParams.toString();
  const queryObj = queryString.split('&').reduce<SearchQueryObj>((acc, el) => {
    const keyAndValue = el.split('=');
    if (keyAndValue[0] === 'search') return acc;
    return { ...acc, [keyAndValue[0]]: keyAndValue[1] };
  }, {});
  console.log(queryString);
  const convertedObj = convertFiltersToSearchApiObj(queryObj);
  console.log(convertedObj);
  const Search = async (nextPageToken?: string) => {
    console.log('new');
    if (search) {
      const searchWithoutPluses = search.split('+').join(' ');
      const { data: SearchData } = await YoutubeAPI.Search({
        part: 'snippet',
        q: searchWithoutPluses,
        pageToken: nextPageToken,
        ...convertedObj,
        publishedAfter:
          convertedObj.publishedAfter &&
          new Date(Date.now() - Number(convertedObj.publishedAfter)).toISOString(),
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
        TotalCount: SearchData.pageInfo.totalResults,
      };
    } else {
      setSearchParams((prevParams) => {
        searchParams.set('search', '');
        return prevParams;
      });
    }
  };
  const [results, isLoading, error] = useScrollPagination<
    (Video | Playlist | Channel | undefined)[] | undefined
  >([], Search, [queryString]);

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
  console.log(error);
  if (error) return <ErrorPage {...error} />;
  return (
    //Разные типы в массиве...думай че сделать можно
    <div className={s.wrapper}>
      <Filters />
      <div className={s.resultsElements}>
        {resultsItems?.length === 0 && !error && !isLoading ? (
          <div>Нет результатов</div>
        ) : (
          resultsItems
        )}

        {isLoading && LoadingVideos}
      </div>
    </div>
  );
};

export default ResultsPage;
