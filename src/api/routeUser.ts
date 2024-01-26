import { LoginResponse } from "./types";

export function handleSuccessfulLoginRoute(userContext: LoginResponse) {
  if (userContext.role === "ADMIN" || userContext.role === "MATCHMAKER") {
    return { shouldRedirect: true, newRoute: "/matchmaking" } as const;
  }
  if (userContext.shouldBeOnlyWaitlisted) {
    return { shouldRedirect: true, newRoute: "/coming-soon" } as const;
  }
  if (
    !userContext.completedTheirProfile &&
    !userContext.shouldBeOnlyWaitlisted
  ) {
    return { shouldRedirect: true, newRoute: "/create" } as const;
  }
  if (userContext.isDisabled) {
    return { shouldRedirect: true, newRoute: "/create?step=payment" } as const;
  }
  if (userContext.isPayingUser && !userContext.completedTheirProfile) {
    return {
      shouldRedirect: true,
      newRoute: "/create?step=profile-details",
    } as const;
  }
  if (userContext.isPayingUser && userContext.completedTheirProfile) {
    return { shouldRedirect: true, newRoute: "/profile/me" } as const;
  }
  return { shouldRedirect: false } as const;
}
