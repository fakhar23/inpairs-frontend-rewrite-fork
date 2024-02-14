import { ENDPOINTS, getAnswers } from "@/api";
import { useQuery } from "@tanstack/react-query";

export function useGetAnswer() {
  return useQuery({
    queryKey: [ENDPOINTS.answers],
    queryFn: async () => {
      return await getAnswers();
    },
  });
}
