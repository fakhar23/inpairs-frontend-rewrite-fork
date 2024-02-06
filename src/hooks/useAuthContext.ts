import { ENDPOINTS, getUserAuthContext } from "@/api";
import { useQuery } from "@tanstack/react-query";

export function useAuthContext(props?: { enabled?: boolean }) {
  const enabled = props ? props.enabled : true;

  const query = useQuery({
    queryKey: [ENDPOINTS.authContext],
    queryFn: async () => {
      return await getUserAuthContext();
    },
    enabled,
  });

  return query;
}
