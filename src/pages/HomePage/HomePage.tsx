import React, { useCallback, useEffect, useRef, useState } from 'react';
import s from './HomePage.module.scss';
import VideoItem from '../../components/HomeC/VideoItem/VideoItem';
import YoutubeAPI, { instance } from '../../services/api/api';
import LoadingVideo from '../../components/UI/Loaders/LoadingVideo/LoadingVideo';
import { useSearchParams } from 'react-router-dom';
import Button from '../../components/UI/Button/Button';
import { RxCross1 } from 'react-icons/rx';
import { VideosData } from '../../types/Videos';
import { useFetching } from '../../hooks/useFetching';
import { useScrollPagination } from '../../hooks/useScrollPagination';
const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    searchParams.get('code') && localStorage.setItem('code', searchParams.get('code') || '');
  }, []);
  // const [videos, firstLoading, ScrollLoading] = useScrollPagination([], YoutubeAPI.getVideos, {
  //   part: 'snippet,contentDetails,statistics',
  //   chart: 'mostPopular',
  //   maxResults: 24,
  // });
  const fetchVideos = async (nextPageToken?: string) => {
    const { data }: { data: VideosData } = await YoutubeAPI.getVideos({
      part: 'snippet,contentDetails,statistics',
      chart: 'mostPopular',
      maxResults: 24,
      pageToken: nextPageToken,
    });
    if (data.items) {
      const newItemsPromise = data.items.map(async (el) => {
        const { data } = await YoutubeAPI.getChannelById({
          part: ['snippet', 'statistics'],
          id: el.snippet.channelId,
        });
        return {
          ...el,
          snippet: {
            ...el.snippet,
            channelImg: data.items && data.items[0].snippet.thumbnails.default,
          },
        };
      });
      const newItems = await Promise.all(newItemsPromise);
      return {
        data: newItems,
        nextPageToken: data.nextPageToken,
      };
    }
    throw new Error('Нет результата');
  };
  const [videos, isLoading, error] = useScrollPagination([], fetchVideos);

  const LoadingVideos = new Array(24).fill(5).map((_, idx) => <LoadingVideo />);
  console.log(videos);
  return (
    <div className={s.videos}>
      {videos.map(({ snippet, contentDetails, statistics, id }: any) => (
        <VideoItem
          id={id}
          title={snippet.title}
          author={snippet.channelTitle}
          channelImg={snippet.channelImg}
          date={snippet.publishedAt}
          videoPrev={snippet.thumbnails.medium}
          duration={contentDetails.duration}
          viewsCount={statistics.viewCount}
        />
      ))}
      {isLoading && LoadingVideos}
    </div>
  );
};

export default HomePage;
