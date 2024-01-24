import { ENDPOINTS, getUserAuthContext } from "@/api";
import { useQuery } from "@tanstack/react-query";

export function useAuthContext() {
  const query = useQuery({
    queryKey: [ENDPOINTS.authContext],
    queryFn: async () => {
      return await getUserAuthContext();
    },
  });

  return query;
}
