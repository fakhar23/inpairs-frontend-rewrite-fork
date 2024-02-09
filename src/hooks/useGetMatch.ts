import { ENDPOINTS, getMatch } from "@/api";
import { useQuery } from "@tanstack/react-query";

export function useGetMatch() {
  return useQuery({
    queryKey: [ENDPOINTS.match],
    queryFn: async () => {
      return await getMatch();
    },
  });
}
