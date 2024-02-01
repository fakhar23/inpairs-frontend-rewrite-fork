import { useQuery } from '@tanstack/react-query';
import { listParams, listResult } from '../types';
import { axios, handleError } from '..';
import { queryParamsToQs } from '../helpers';

export const useGetScoring = ({ queryParams = {} }: listParams = {}) => {
  const queryString = queryParamsToQs(queryParams);
  return useQuery({
    queryKey: ['scoring', queryString],
    queryFn: async (): Promise<listResult> => {
      const { data } = await axios.get(`/matchmaking/scoring${queryString}`);
      return data
    },
    placeholderData: (previousData) => previousData,
    throwOnError: handleError,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
