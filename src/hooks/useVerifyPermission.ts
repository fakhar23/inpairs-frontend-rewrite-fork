import { useAuthContext } from "./useAuthContext";
import { usePathname, useRouter } from "next/navigation";

const useVerifyPermission = (permissions: string[] = []) => {
  const { data: user, isLoading } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();
  if (!isLoading) {
    if (!user) router.push(`/login?redirectUrl=${pathname}`);

    if (
      permissions.length &&
      user?.role &&
      !permissions.map((role) => role).includes(user?.role)
    ) {
      router.push(user?.role === "USER" ? "/profile/me" : "/matchmaking");
    }
  }
  return {
    isLoading,
    status: isLoading
      ? "loading"
      : user?.email
        ? "authecticated"
        : "unauthenticated",
  };
};

export default useVerifyPermission;
