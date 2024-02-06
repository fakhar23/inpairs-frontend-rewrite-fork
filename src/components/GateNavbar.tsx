"use client";
import { useState } from "react";
import Image from "next/image";
import { Link, Skeleton } from "@/components";
import { usePathname } from "next/navigation";
import { LinkButton } from "@/components";
import logo from "@/assets/pears-inline.png";
import { CloseIcon, MenuIcon } from "../Icons";
import { AuthContextResponse } from "@/api/types";
import { useClickOutside } from "@mantine/hooks";
import { useSpring, animated } from "react-spring";
import { twMerge } from "tailwind-merge";
import { useGateNav } from "@/hooks/useGateNav";

interface IMenuProps {
  isOpen: boolean;
  onClose: () => void;
  loginPage?: boolean;
}

function getLink(
  userContext: AuthContextResponse | undefined,
  view: "desktop" | "mobile"
) {
  const className = twMerge(view === "desktop" ? "lg:hidden" : "w-full");
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
      <LinkButton className={className} path="/coming-soon">
        Coming Soon
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

const Menu = ({ isOpen, onClose, loginPage }: IMenuProps) => {
  const pathname = usePathname();
  const { isLoggedIn, shouldDisplayLogout, user } = useGateNav(loginPage);

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
          "hover:bg-[#ef3e37] active:bg-[#ef3e37] hover:text-white active:text-white py-4 my-1 px-2 hover:bg-opacity-90 transition-all duration-300 rounded-md",
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
      className={`fixed z-10 shadow-md bg-white top-0 right-0 p-[1rem] w-[50%] h-[100vh] sm:w-[70%]
          space-y-10 text-right`}
      ref={closeOnOutsideClickRef}
    >
      <button
        className="cursor-pointer pl-6"
        title="closing button"
        onClick={onClose}
      >
        <CloseIcon size={"2.5em"} />
      </button>

      <ul className="text-[1.2rem] text-left flex flex-col">
        {links}
        <Skeleton
          isLoading={user.isLoading || !!isLoggedIn.data}
          width={250}
          height={38}
        >
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

export function GateNavbar({ loginPage = false }: { loginPage?: boolean }) {
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
  const { isLoggedIn, shouldDisplayLogout, user } = useGateNav(loginPage);
  const pathname = usePathname();

  return (
    <div className="relative px-[2rem] lg:pr-2 py-[0.6rem] flex gap-4 flex-wrap justify-between items-center w-[100%] shadow-md mb-0 bg-white  z-[10]">
      <Link href="/">
        <Image
          src={logo}
          alt="pairs logo"
          className="w-[7rem]"
          priority={true}
        />
      </Link>

      <ul
        className={`font-bryant font-medium   flex justify-between items-center  gap-[2rem] [&>*]:cursor-pointer [&>*]:text-[1.2rem] text-gray list-none lg:hidden`}
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
        isLoading={!!isLoggedIn.data && user.isLoading}
        width={250}
        height={38}
      >
        <div className="flex gap-4">
          {getLink(user.data, "desktop")}

          {shouldDisplayLogout && (
            <LinkButton className="lg:hidden" path="/login">
              Logout
            </LinkButton>
          )}
        </div>
      </Skeleton>

      <button
        type="button"
        title="menu"
        className="items-center p-2 text-neutral-500 rounded-lg hidden lg:inline-flex hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        onClick={() => {
          setIsMenuOpened(!isMenuOpened);
        }}
      >
        <MenuIcon />
      </button>

      <Menu
        isOpen={isMenuOpened}
        onClose={() => setIsMenuOpened(false)}
        loginPage={loginPage}
      />
    </div>
  );
}
