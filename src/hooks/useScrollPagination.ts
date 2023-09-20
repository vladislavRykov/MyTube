// @ts-nocheck
import YoutubeAPI, { VideosParts } from '../services/api/api';
import { ItemsEntity } from '../types/Channel';
import { VideosData } from '../types/Videos';
import { useEffect, useRef, useState } from 'react';
import { ArrowFunction } from 'typescript';
import { useFetching } from './useFetching';

export const useScrollPagination = <T = any>(
  initial: any,
  cb: () => Promise<{ data: any; nextPageToken: string | undefined } | undefined>,
  dep: any[] = [],
  scrollItem: React.RefObject<any> | null = null,
): [T, boolean, null | any, boolean] => {
  const [NewCb, isLoading, error] = useFetching(cb);
  const [data, setData] = useState<ItemsEntity[]>(initial);
  const [nextPageToken, setNextPage] = useState<string | null>(null);
  const [isNearBottom, setIsNearBottom] = useState<boolean>(false);
  const firstScroll = useRef(true);
  useEffect(() => {
    const getVideos = async () => {
      setData([]);
      const cbData: { data: any; nextPageToken: string } = await NewCb();
      if (cbData) {
        setData(cbData.data);
        setNextPage(cbData.nextPageToken);
      }
    };
    getVideos().finally((_) => {
      window.scrollTo(0, 0);
    });
  }, dep);
  useEffect(() => {
    console.log(scrollItem);
    const onScrollToDown = async (e: React.UIEvent<any, UIEvent>) => {
      console.log(123);
      let condition = window.innerHeight + window.scrollY >= document.body.scrollHeight;
      if (scrollItem)
        condition =
          e.currentTarget.scrollHeight <= e.currentTarget.scrollTop + e.currentTarget.clientHeight;
      if (condition) {
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
    if (scrollItem) {
      scrollItem.current.addEventListener('scroll', onScrollToDown);
    } else {
      window.addEventListener('scroll', onScrollToDown);
    }
    return () => {
      scrollItem?.current.removeEventListener('scroll', onScrollToDown);
      window.removeEventListener('scroll', onScrollToDown);
    };
  }, [nextPageToken]);
  return [data, isLoading, error, isNearBottom];
};
