import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "./useAuthContext";

export function useGateNav(loginPage?: boolean) {
  const isLoggedIn = useQuery({
    queryKey: ["load-jwt", loginPage],
    queryFn: async () => {
      return !loginPage && !!localStorage.getItem("jwt");
    },
    staleTime: 0,
  });

  const user = useAuthContext({
    enabled: !!isLoggedIn.data,
  });

  const shouldDisplayLogout = user.data?.shouldBeOnlyWaitlisted || user.data;

  return {
    isLoggedIn,
    user,
    shouldDisplayLogout,
  };
}
