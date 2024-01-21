import { LoginResponse } from "./types";

export function handleSuccessfulLoginRoute(userContext: LoginResponse) {
  if (
    !userContext.completedTheirProfile &&
    !userContext.shouldBeOnlyWaitlisted
  ) {
    return { shouldRedirect: true, newRoute: "/create" } as const;
  }
  return { shouldRedirect: false } as const;
}
