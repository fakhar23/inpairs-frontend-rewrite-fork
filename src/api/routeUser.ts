import { LoginResponse } from "./types";

export function handleSuccessfulLoginRoute(userContext: LoginResponse) {
  if (userContext.role === "ADMIN" || userContext.role === "MATCHMAKER") {
    return {
      shouldRedirect: true,
      path: "/matchmaking",
    } as const;
  }
  if (userContext.shouldBeOnlyWaitlisted) {
    return { shouldRedirect: true, path: "/coming-soon" } as const;
  }
  if (userContext.isPayingUser && !userContext.completedTheirProfile) {
    return {
      shouldRedirect: true,
      path: "/create?step=profile-details",
    } as const;
  }
  if (userContext.isPayingUser && userContext.completedTheirProfile) {
    return { shouldRedirect: true, path: "/profile/me" } as const;
  }
  if (
    !userContext.completedTheirProfile &&
    !userContext.shouldBeOnlyWaitlisted
  ) {
    return { shouldRedirect: true, path: "/create" } as const;
  }
  if (userContext.isDisabled) {
    return { shouldRedirect: true, path: "/create?step=payment" } as const;
  }

  return { shouldRedirect: false } as const;
}
