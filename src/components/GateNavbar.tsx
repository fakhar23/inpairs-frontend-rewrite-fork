"use client";
import { useState } from "react";

import Image from "next/image";
import { Link, Skeleton } from "@/components";
import { usePathname } from "next/navigation";

import { LinkButton } from "@/components";

import logo from "@/assets/pears-inline.png";
import { CloseIcon, MenuIcon } from "../Icons";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "@/hooks/useAuthContext";
import { AuthContextResponse } from "@/api/types";
import { useClickOutside } from "@mantine/hooks";
import { useSpring, animated } from "react-spring";
import { twMerge } from "tailwind-merge";

interface IMenuProps {
  isOpen: boolean;
  onClose: () => void;
  canViewTheirProfile?: boolean;
}

function getLink(
  userContext: AuthContextResponse | undefined,
  view: "desktop" | "mobile"
) {
  const className = twMerge(view === "desktop" ? "md:hidden" : "w-full");
  const links = {
    unauthenticated: (
      <LinkButton className={className} path="/login">
        Start your journey
      </LinkButton>
    ),
    administrativeRole: (
      <LinkButton className={className} path="/matchmaking">
        Scoring dashboard
      </LinkButton>
    ),
    nonSupportedCountry: (
      <LinkButton className={className} path="/login">
        Logout
      </LinkButton>
    ),
    payingButDidNotCompleteTheirProfile: (
      <LinkButton className={className} path="/create?step=profile-details">
        Continue your profile
      </LinkButton>
    ),
    didNotStartCreatingTheirProfile: (
      <LinkButton className={className} path="/create">
        Continue creating your profile
      </LinkButton>
    ),
    payingAndCompletedTheirProfile: (
      <LinkButton className={className} path="/profile/me">
        My profile
      </LinkButton>
    ),
    disabledAndDidNotCompleteTheirProfile: (
      <LinkButton className={className} path="/create?step=payment">
        Continue creating your profile
      </LinkButton>
    ),
    disabled: (
      <LinkButton className={className} path="/profile/me">
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

const Menu = ({ isOpen, onClose, canViewTheirProfile = false }: IMenuProps) => {
  const { data: isLoggedIn } = useQuery({
    queryKey: ["load-jwt"],
    queryFn: async () => {
      return !!localStorage.getItem("jwt");
    },
    staleTime: 0,
  });

  const user = useAuthContext({
    enabled: !!isLoggedIn,
  });

  const shouldDisplayLogout = user.data?.shouldBeOnlyWaitlisted || user.data;

  const pathname = usePathname();

  const props = useSpring({
    to: {
      opacity: isOpen ? 1 : 0,
      transform: `translateX(${isOpen ? 0 : 100}%)`,
    },
    from: { opacity: 0, transform: "translateX(100%)" },
    config: { duration: 200, clamp: true },
  });

  const closeOnOutsideClickRef = useClickOutside(onClose);

  const links = [
    ["/", "Home"],
    ["/how", "How does it work?"],
    ["/about", "About us"],
    ["/contact", "Contact us"],
    ["/FAQ", "FAQ"],
  ].map(([path, name]) => (
    <Link key={path} href={path} onClick={onClose}>
      <li
        className={twMerge(
          "hover:bg-[#ef3e37] active:bg-[#ef3e37] hover:text-white active:text-white py-4 my-1 px-4 hover:bg-opacity-90 transition-all duration-300 rounded-md",
          pathname === path ? "text-purple" : ""
        )}
      >
        <span onClick={onClose}>{name}</span>
      </li>
    </Link>
  ));

  return (
    <animated.div
      style={props}
      className={`fixed z-10 shadow-md bg-white top-0 right-0 p-[1.5rem] w-[50%] h-[100vh] sm:w-[70%]
          space-y-10 text-right`}
      ref={closeOnOutsideClickRef}
    >
      <button
        className="cursor-pointer px-12"
        title="closing button"
        onClick={onClose}
      >
        <CloseIcon size={"2.5em"} />
      </button>

      <ul className="text-[1.5rem] text-left [] flex flex-col gap-4">
        {links}
        <Skeleton isLoading={false} width={250} height={38}>
          <div className="flex flex-col gap-4">
            {getLink(user.data, "mobile")}

            {shouldDisplayLogout && (
              <LinkButton path="/login" className="w-full">
                Logout
              </LinkButton>
            )}
          </div>
        </Skeleton>
      </ul>
    </animated.div>
  );
};

export function GateNavbar() {
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);

  const pathname = usePathname();

  const { data: isLoggedIn } = useQuery({
    queryKey: ["load-jwt"],
    queryFn: async () => {
      return !!localStorage.getItem("jwt");
    },
    staleTime: 0,
  });

  const user = useAuthContext({
    enabled: !!isLoggedIn,
  });

  const shouldDisplayLogout = user.data?.shouldBeOnlyWaitlisted || user.data;

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
        <div className="flex gap-4">
          {getLink(user.data, "desktop")}

          {shouldDisplayLogout && (
            <LinkButton className="md:hidden" path="/login">
              Logout
            </LinkButton>
          )}
        </div>
      </Skeleton>

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

      <Menu
        isOpen={isMenuOpened}
        onClose={() => setIsMenuOpened(false)}
        canViewTheirProfile={user.data?.canViewTheirProfile}
      />
    </div>
  );
}
