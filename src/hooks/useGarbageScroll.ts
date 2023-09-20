// @ts-nocheck
import YoutubeAPI, { VideosParts } from '../services/api/api';
import { ItemsEntity } from '../types/Channel';
import { VideosData } from '../types/Videos';
import { useEffect, useRef, useState } from 'react';
import { ArrowFunction } from 'typescript';

export const useScrollPagination = (
  initial: any,
  cb: any,
  cbParams: any,
): [any, boolean, boolean] => {
  const [data, setData] = useState<ItemsEntity[]>(initial);
  const [loading, setLoading] = useState(false);
  const [nextPageToken, setNextPage] = useState<string | null>(null);
  const [isNearBottom, setIsNearBottom] = useState<boolean>(false);
  const firstScroll = useRef(true);
  useEffect(() => {
    const getVideos = async () => {
      setLoading(true);
      const { data }: { data: VideosData } = await cb(cbParams);
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
        setData((prev) => prev.concat(newItems));
        setNextPage(data.nextPageToken);
        setLoading(false);
      }
    };
    getVideos();
  }, []);
  useEffect(() => {
    const onScrollToDown = (e) => {
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 800) {
        setIsNearBottom(true);
        if (firstScroll.current) {
          firstScroll.current = false;
          cb({
            ...cbParams,
            nextPageToken: nextPageToken,
          }).then(async ({ data }) => {
            const newItemsPromise = data.items.map(async (el) => {
              const { data } = await YoutubeAPI.getChannelById({
                part: ['snippet', 'statistics'],
                id: el.snippet.channelId,
              });
              return {
                ...el,
                snippet: {
                  ...el.snippet,
                  channelImg: data.items[0].snippet.thumbnails.default,
                },
              };
            });
            const newItems = await Promise.all(newItemsPromise);
            setData((prev) => prev.concat(newItems));
            setNextPage(data.nextPageToken);
            setIsNearBottom(false);
            firstScroll.current = true;
          });
        }
      }
    };
    window.addEventListener('scroll', onScrollToDown);
    return () => window.removeEventListener('scroll', onScrollToDown);
  }, [nextPageToken]);
  return [data, loading, isNearBottom];
};
