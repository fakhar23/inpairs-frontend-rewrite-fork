import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { listParams, listResult } from '../types';
import { axios, handleError } from '..';
import { getMatchTrackingArgs, getMatchTrackingResult } from './type';
import { queryParamsToQs } from '../helpers';

// >> ROOT:
export const useListMatchmaking = ({
  queryParams = {},
  skip = false,
}: listParams = {}) => {
  const queryString = queryParamsToQs(queryParams);
  return useQuery({
    queryKey: ['matchmaking', queryString],
    queryFn: async (): Promise<listResult> => {
      const { data } = await axios.get(`/matchmaking${queryString}`);
      return data;
    },
    enabled: !skip,
    placeholderData: (previousData) => previousData,
    throwOnError: handleError,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useUpdateMatchmaking = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, payload }: any) => {
      return await axios.patch(`/matchmaking/${id}`, payload)
    },
    onSuccess: (a, b) => {
      queryClient.invalidateQueries({ queryKey: ['matchmaking'] })
      // queryClient.invalidateQueries({ queryKey: ['matchmaking-detail'] })
    },
    onError: handleError
  })
}



// >> TRACKING:
export const useGetMatchTracking = ({
  queryParams = {},
  skip = false,
}: getMatchTrackingArgs = {}) => {
  const queryString = queryParamsToQs(queryParams);
  return useQuery({
    queryKey: ['matchmaking_tracking', queryString],
    queryFn: async (): Promise<getMatchTrackingResult> => {
      const { data } = await axios.get(`/matchmaking/tracking${queryString}`);
      return data;
    },
    enabled: !skip,
    placeholderData: (previousData) => previousData,
    throwOnError: handleError,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
