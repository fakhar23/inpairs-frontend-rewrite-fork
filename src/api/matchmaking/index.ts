import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ENDPOINTS,
  getMatchTracking,
  getMatchmaking,
  updateMatchmaking,
} from "..";
import { queryParamsToQs } from "../helpers";

export const useListMatchmaking = ({ queryParams = {}, skip = false } = {}) => {
  const queryString = queryParamsToQs(queryParams);
  return useQuery({
    queryKey: [ENDPOINTS.matchmaking, queryString],
    queryFn: async () => {
      return await getMatchmaking(queryString);
    },
    enabled: !skip,
    placeholderData: (previousData) => previousData,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useUpdateMatchmaking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }: any) => {
      return await updateMatchmaking(id, payload);
    },
    onSuccess: (a, b) => {
      queryClient.invalidateQueries({ queryKey: [ENDPOINTS.matchmaking] });
    },
  });
};

export const useGetMatchTracking = ({ queryParams = {}, skip = false }) => {
  const queryString = queryParamsToQs(queryParams);
  return useQuery({
    queryKey: [ENDPOINTS.matchTracking, queryString],
    queryFn: async () => {
      return await getMatchTracking(queryString);
    },
    enabled: !skip,
    placeholderData: (previousData) => previousData,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
