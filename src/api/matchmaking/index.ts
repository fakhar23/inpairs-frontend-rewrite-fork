import { useQuery } from "@tanstack/react-query";
import { getMatchScoring } from "..";
import { queryParamsToQs } from "../helpers";
import { listParams, scoringResult } from "./types";

export const useGetScoring = ({ queryParams = {} }: listParams = {}) => {
  const queryString = queryParamsToQs(queryParams);
  return useQuery({
    queryKey: ["scoring", queryString],
    queryFn: async (): Promise<scoringResult> => {
      return await getMatchScoring(queryString);
    },
    placeholderData: (previousData) => previousData,
    refetchOnWindowFocus: false,
  });
};
