"use client";
import { useState } from "react";

import Image from "next/image";
import { Link, Skeleton } from "@/components";
import { usePathname } from "next/navigation";

import { LinkButton } from "@/components";

import logo from "@/assets/pears-inline.png";
import { MenuIcon } from "../Icons";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "@/hooks/useAuthContext";
import { AuthContextResponse } from "@/api/types";

function getLink(userContext: AuthContextResponse | undefined) {
  const links = {
    unauthenticated: {
      content: "Start your journey",
      path: "/login",
    },
    administrativeRole: {
      content: "Scoring dashboard",
      path: "/matchmaking",
    },
    nonSupportedCountry: {
      content: "Logout",
      path: "/login",
    },
    payingButDidNotCompleteTheirProfile: {
      content: "Continue your profile",
      path: "/create?step=profile-details",
    },
    didNotStartCreatingTheirProfile: {
      content: "Continue your profile",
      path: "/create",
    },
    payingAndCompletedTheirProfile: {
      content: "My profile",
      path: "/profile/me",
    },
    disabledAndDidNotCompleteTheirProfile: {
      content: "Continue your profile",
      path: "/create?step=payment",
    },
    disabled: {
      content: "My profile",
      path: "/profile/me",
    },
  };
  if (!userContext) return links.unauthenticated;
  else if (userContext.role === "ADMIN" || userContext.role === "MATCHMAKER")
    return links.administrativeRole;
  else if (userContext.shouldBeOnlyWaitlisted) return links.nonSupportedCountry;
  if (userContext.isPayingUser && !userContext.completedTheirProfile)
    return links.payingAndCompletedTheirProfile;
  if (userContext.isPayingUser && userContext.completedTheirProfile)
    return links.payingAndCompletedTheirProfile;
  if (!userContext.completedTheirProfile && !userContext.shouldBeOnlyWaitlisted)
    return links.didNotStartCreatingTheirProfile;
  else if (userContext.isDisabled && !userContext.completedTheirProfile)
    return links.disabledAndDidNotCompleteTheirProfile;
  else if (userContext.isDisabled) return links.disabled;
  else throw new Error("Unsupported state");
}

export function GateNavbar() {
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);

  const pathname = usePathname();

  const { data: isLoggedIn } = useQuery({
    queryKey: ["load-jwt"],
    queryFn: async () => {
      return !!localStorage.getItem("jwt");
    },
  });

  const user = useAuthContext({
    enabled: !!isLoggedIn,
  });

  return (
    <div className="relative px-[4rem] py-[0.6rem] flex justify-between items-center w-[100%] shadow-md mb-0 bg-white  z-[10]">
      <Link href="/">
        <Image
          src={logo}
          alt="pairs logo"
          className="w-[8rem]"
          priority={true}
        />
      </Link>

      <button
        type="button"
        title="menu"
        className="items-center p-2 text-neutral-500 rounded-lg hidden md:inline-flex hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:ring-gray-600"
        onClick={() => {
          setIsMenuOpened(!isMenuOpened);
        }}
      >
        <MenuIcon />
      </button>

      <ul
        className={`font-bryantProMedium  flex justify-between items-center  gap-[3rem] [&>*]:cursor-pointer [&>*]:text-[1.2rem] text-gray-charcoal list-none md:hidden`}
      >
        <li className={pathname === "/" ? "text-purple" : ""}>
          <Link href="/">Home</Link>
        </li>

        <li className={pathname === "/how" ? "text-purple" : ""}>
          <Link href="how">How does it work?</Link>
        </li>

        <li className={pathname === "/about" ? "text-purple" : ""}>
          <Link href="about">About us</Link>
        </li>

        <li className={pathname === "/contact" ? "text-purple" : ""}>
          <Link href="contact">Contact us</Link>
        </li>

        <li className={pathname === "/FAQ" ? "text-purple" : ""}>
          <Link href="FAQ">FAQ</Link>
        </li>
      </ul>

      <Skeleton
        isLoading={!!isLoggedIn && user.isLoading}
        width={250}
        height={38}
      >
        <LinkButton className="md:hidden" {...getLink(user.data)} />
      </Skeleton>
    </div>
  );
}
