"use client";
import { ReactNode, useState } from "react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import { Link } from "@/components";
import { usePathname } from "next/navigation";

import { useClickOutside } from "@mantine/hooks";
import { animated, useTransition } from "react-spring";

import pearsInline from "@/assets/pears-white.svg";
import profileImg from "@/assets/prof-pic.png";
import bgArt from "@/assets/usernavArt.svg";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});
const NavigationPaths = {
  matchmaking: "/matchmaking",
  profileMe: "/profile/me",
  profileMeMatch: "/my-match",
  users: "/users",
  profileMeContact: "/profile/me/contact",
} as const;

function UserProfileLayout({ children }: { children: ReactNode }) {
  const [openNav, setOpenNav] = useState<boolean>(false);
  const pathName = usePathname();
  const profileMenuRef = useClickOutside(() => setOpenNav(false)); //if any click in done outside this ref, then setOpenNav will become false

  const user = {
    role: "MATCHMAKER",
    firstName: "Muhammad",
    lastName: "Fakhar",
  };

  async function handleLogout() {}

  const isAdministrationRole =
    user && ["ADMIN", "MATCHMAKER"].includes(user?.role);
  const isAdminOnly = user && user?.role == "ADMIN";

  const transitions = useTransition(openNav, {
    from: { opacity: 0, transform: "translate3d(0, -15%, 0)" },
    enter: { opacity: 1, transform: "translate3d(0, 0%, 0)" },
    leave: { opacity: 0, transform: "translate3d(0, -15%, 0)" },
    config: { duration: 200, clamp: true },
  });

  return (
    <>
      <nav className="relative bg-red-200 bg-gradient-to-r from-red-500 to-purple-900 px-[4rem] pt-[2rem] pb-[3rem] text-white mb-2">
        {/* Background Image of entire nav */}
        <Image
          src={bgArt}
          alt="art"
          className="absolute top-0 left-0 w-[100%] h-[100%] object-cover object-center z-0"
        />
        <section className="relative flex justify-between z-2">
          {/* Left Logo */}
          <div className="flex items-center w-[8%] sm:w-[50%]">
            <Link href="/">
              <Image
                className="h-[100%] w-[100%]"
                alt="inpairs logo pears"
                src={pearsInline}
              />
            </Link>
          </div>
          {/* Tab names that are displayed in center */}
          <div className="flex items-center w-full">
            <ul className="flex p-4 mt-0 flex-row items-center justify-around lg:space-x-8 text-lg lg:font-bryantProMedium lg:border-0 w-[50%] my-0 mx-auto md:w-full md:hidden">
              <>
                {isAdministrationRole ? (
                  <Link
                    href="/matchmaking"
                    className={
                      "py-2 " +
                      (pathName === NavigationPaths.matchmaking
                        ? "border-b"
                        : "")
                    }
                  >
                    <li>Matchmaking</li>
                  </Link>
                ) : null}
                <Link
                  href="/profile/me"
                  className={
                    "py-2 " +
                    (pathName === NavigationPaths.profileMe ? "border-b" : "")
                  }
                >
                  <li>My profile</li>
                </Link>
                <Link
                  href={"/my-match"}
                  className={
                    "py-2 " +
                    (pathName === NavigationPaths.profileMeMatch
                      ? "border-b"
                      : "")
                  }
                >
                  <li>My match</li>
                </Link>
                {isAdminOnly ? (
                  <Link
                    href="/users"
                    className={
                      "py-2 " +
                      (pathName === NavigationPaths.users ? "border-b" : "")
                    }
                  >
                    <li>Users</li>
                  </Link>
                ) : null}
                <Link
                  href={"/profile/me/contact"}
                  className={
                    "py-2 " +
                    (pathName === NavigationPaths.profileMeMatch
                      ? "border-b"
                      : "")
                  }
                >
                  <li>Contact</li>
                </Link>
              </>
            </ul>
          </div>
          {/* User's name with profile Icon on the Right */}
          <div className="flex items-center gap-[1rem]" ref={profileMenuRef}>
            <div className="relative">
              <button
                className="cursor-pointer flex items-center gap-[1rem]"
                onClick={() => setOpenNav(!openNav)}
              >
                <p
                  className={`whitespace-nowrap ${poppins.className}`}
                >{`${user?.firstName} ${user?.lastName}`}</p>{" "}
                <div className="h-[2rem] w-[2rem] rounded-full">
                  <Image
                    src={profileImg}
                    alt="profile image"
                    className="h-[100%] w-[100%] object-cover rounded-full"
                  />
                </div>
              </button>
              {/* Profile Menu */}
              <>
                {transitions((style, item) =>
                  item ? (
                    <animated.ul
                      style={style}
                      className={`overflow-hidden border-orange block border nav absolute top-10 right-0 z-10 w-56 origin-top-right rounded-md bg-white shadow-lg text-black ease-in-out duration-300 [&_*]:transition-all [&_*]:duration-300 `}
                    >
                      <Link
                        onClick={() => setOpenNav(false)}
                        href={"/profile/me"}
                      >
                        <li className="hover:bg-[#ef3e37] text-gray block px-4 py-2 text-sm hover:bg-orange hover:bg-opacity-50">
                          Profile
                        </li>
                      </Link>
                      <Link
                        onClick={() => setOpenNav(false)}
                        href={"/settings"}
                      >
                        <li className="hover:bg-[#ef3e37] text-gray block px-4 py-2 text-sm hover:bg-orange hover:bg-opacity-50">
                          Settings
                        </li>
                      </Link>
                      <Link
                        onClick={() => setOpenNav(false)}
                        href={"/my-match"}
                      >
                        <li className="hover:bg-[#ef3e37] text-gray block px-4 py-2 text-sm hover:bg-orange hover:bg-opacity-50">
                          My Match
                        </li>
                      </Link>
                      <Link
                        onClick={() => setOpenNav(false)}
                        href={"/profile/me/contact"}
                      >
                        <li className="hover:bg-[#ef3e37] text-gray block px-4 py-2 text-sm  hover:bg-orange hover:bg-opacity-50">
                          Contact
                        </li>
                      </Link>
                      <li
                        className="hover:bg-[#ef3e37] hover:bg-opacity-50 text-gray block px-4 py-2 text-sm  hover:bg-orange  cursor-pointer"
                        onClick={() => {
                          setOpenNav(false);
                          handleLogout();
                        }}
                      >
                        log out
                      </li>
                    </animated.ul>
                  ) : null
                )}
              </>
            </div>
          </div>
        </section>
      </nav>
      {children}
    </>
  );
}

export default UserProfileLayout;
