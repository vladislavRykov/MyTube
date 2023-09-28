// @ts-nocheck
import YoutubeAPI, { VideosParts } from '../services/api/api';
import { ItemsEntity } from '../types/Channel';
import { VideosData } from '../types/Videos';
import { useEffect, useRef, useState } from 'react';
import { ArrowFunction } from 'typescript';
import { useFetching } from './useFetching';
import { useSearchParams } from 'react-router-dom';
import { playlistItemsMock } from '../components/VideoC/PlaylistItemsBlock/playlistItems';
import { ErrorObject } from '../types/Common';

export const useScrollPagination = <T = any>(
  initial: any,
  cb: () => Promise<
    { data: any; nextPageToken: string | undefined; TotalCount: number } | undefined
  >,
  dep: any[] = [],
  options: { scrollItem?: React.RefObject<any>; TotalCount?: number; scrollDeps?: any[] } = {
    scrollDeps: [],
  },
): [T, boolean, null | ErrorObject, boolean] => {
  const [NewCb, isLoading, error] = useFetching(cb);
  const [data, setData] = useState<ItemsEntity[]>(initial);
  const [nextPageToken, setNextPage] = useState<string | null>(null);
  const [isNearBottom, setIsNearBottom] = useState<boolean>(false);
  const firstScroll = useRef(true);
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [searchParams, _] = useSearchParams();
  useEffect(() => {
    const getVideos = async () => {
      let pageToken: string | null = null;
      let dataLength: number = 0;
      setData([]);
      const idx = searchParams.get('idx');
      do {
        const cbData: { data: any; nextPageToken: string | undefined; TotalCount: number } =
          await NewCb(pageToken);
        if (cbData) {
          dataLength += cbData.data.length;
          pageToken = cbData.nextPageToken;
          setData((prev) => [...prev, ...cbData.data]);
          setNextPage(cbData.nextPageToken);
          setTotalCount(cbData.TotalCount);
        }
      } while (idx && Number(idx) > dataLength);
    };
    getVideos().finally((_) => {
      !options.scrollItem && window.scrollTo(0, 0);
    });
  }, dep);
  useEffect(() => {
    const onScrollToDown = async (e: React.UIEvent<any, UIEvent>) => {
      let condition = window.innerHeight + window.scrollY >= document.body.scrollHeight - 10;
      if (options.scrollItem) {
        condition =
          e.currentTarget.scrollHeight - 10 <=
          e.currentTarget.scrollTop + e.currentTarget.clientHeight;
      }
      if (condition && data.length < totalCount) {
        setIsNearBottom(true);
        if (firstScroll.current) {
          firstScroll.current = false;
          const cbData: { data: any; nextPageToken: string } = await NewCb(nextPageToken);
          firstScroll.current = true;
          if (cbData) {
            setData((prev) => prev.concat(cbData.data));
            setNextPage(cbData.nextPageToken);
            setIsNearBottom(false);
          }
        }
      }
    };
    if (options.scrollItem) {
      options.scrollItem.current?.addEventListener('scroll', onScrollToDown);
    } else {
      window.addEventListener('scroll', onScrollToDown);
    }
    return () => {
      options.scrollItem?.current?.removeEventListener('scroll', onScrollToDown);
      window.removeEventListener('scroll', onScrollToDown);
    };
  }, [nextPageToken, ...options.scrollDeps]);
  return [data, isLoading, error, isNearBottom];
};
