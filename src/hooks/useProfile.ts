import { ENDPOINTS, getProfileData } from "@/api";
import { useQuery } from "@tanstack/react-query";

export function useProfile(userId: string) {
  const profileData = useQuery({
    queryKey: [ENDPOINTS.profileData, userId],
    queryFn: async () => {
      return await getProfileData(userId);
    },
  });
  const stateOrCountry =
    profileData.data?.MainState ===
    "Outside the US (literally any other country)"
      ? profileData.data.MainCountry
      : profileData.data?.MainState;

  const currentLocation = `${profileData.data?.MainCity}, ${stateOrCountry}`;

  return { profileData, stateOrCountry, currentLocation };
}
