import { AxiosError } from 'axios';
import { useState } from 'react';
import { ErrorObject } from '../types/Common';

export const useFetching = (
  cb: any,
): [(...params: any) => Promise<any>, boolean, ErrorObject | null] => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorObject | null>(null);

  const fetchingFunc = async (...params: any) => {
    try {
      setError(null);
      setIsLoading(true);
      const data = await cb(...params);
      return data;
    } catch (error: any) {
      let errorObject: ErrorObject = {
        message: 'Неизвестная ошибка',
        type: 'UNKNOWN_ERROR',
        status: 400,
      };
      if (error instanceof AxiosError) {
        if (error.code === 'ERR_NETWORK') {
          errorObject = {
            message: 'Произошла ошибка. Проверте подключение к интернету.',
            type: 'ERR_NETWORK',
            status: 400,
          };
        } else if (error.response?.data.error) {
          errorObject = {
            message: error.response.data.error.message,
            type: error.code || 'ERROR',
            status: error.response.status,
          };
        }
      }

      setError(errorObject);
    } finally {
      setIsLoading(false);
    }
  };
  return [fetchingFunc, isLoading, error];
};
