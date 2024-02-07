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
    unauthenticated: (
      <LinkButton className="md:hidden" path="/login">
        Start your journey
      </LinkButton>
    ),
    administrativeRole: (
      <>
        <LinkButton className="md:hidden" path="/matchmaking">
          Scoring dashboard
        </LinkButton>
        <LinkButton className="md:hidden" path="/login">
          Logout
        </LinkButton>
      </>
    ),
    nonSupportedCountry: (
      <LinkButton className="md:hidden" path="/login">
        Logout
      </LinkButton>
    ),
    payingButDidNotCompleteTheirProfile: (
      <LinkButton className="md:hidden" path="/create?step=profile-details">
        Continue your profile
      </LinkButton>
    ),
    didNotStartCreatingTheirProfile: (
      <LinkButton className="md:hidden" path="/create">
        Continue creating your profile
      </LinkButton>
    ),
    payingAndCompletedTheirProfile: (
      <LinkButton className="md:hidden" path="/profile/me">
        My profile
      </LinkButton>
    ),
    disabledAndDidNotCompleteTheirProfile: (
      <LinkButton className="md:hidden" path="/create?step=payment">
        Continue creating your profile
      </LinkButton>
    ),
    disabled: (
      <LinkButton className="md:hidden" path="/profile/me">
        My profile
      </LinkButton>
    ),
  };
  if (!userContext) return links.unauthenticated;
  else if (userContext.role === "ADMIN" || userContext.role === "MATCHMAKER")
    return links.administrativeRole;
  else if (userContext.shouldBeOnlyWaitlisted) return links.nonSupportedCountry;
  if (userContext.isPayingUser && userContext.completedTheirProfile)
    return links.payingAndCompletedTheirProfile;
  if (userContext.isPayingUser && !userContext.completedTheirProfile)
    return links.payingButDidNotCompleteTheirProfile;
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
        className={`font-bryantProMedium  flex justify-between items-center  gap-[3rem] [&>*]:cursor-pointer [&>*]:text-[1.2rem] text-gray list-none md:hidden`}
      >
        <li className={pathname === "/" ? "text-secondary" : ""}>
          <Link href="/">Home</Link>
        </li>

        <li className={pathname === "/how" ? "text-secondary" : ""}>
          <Link href="how">How does it work?</Link>
        </li>

        <li className={pathname === "/about" ? "text-secondary" : ""}>
          <Link href="about">About us</Link>
        </li>

        <li className={pathname === "/contact" ? "text-secondary" : ""}>
          <Link href="contact">Contact us</Link>
        </li>

        <li className={pathname === "/FAQ" ? "text-secondary" : ""}>
          <Link href="FAQ">FAQ</Link>
        </li>
      </ul>

      <Skeleton
        isLoading={!!isLoggedIn && user.isLoading}
        width={250}
        height={38}
      >
        {getLink(user.data)}
      </Skeleton>
    </div>
  );
}
