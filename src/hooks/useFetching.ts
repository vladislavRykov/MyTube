import { useState } from 'react';

export const useFetching = (cb: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchingFunc = async (...params: any) => {
    try {
      setError(null);
      setIsLoading(true);
      const data = await cb(...params);
      return data;
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  return [fetchingFunc, isLoading, error];
};
