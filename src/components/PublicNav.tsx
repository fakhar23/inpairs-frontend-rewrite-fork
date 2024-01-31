"use client";
import { Dispatch, SetStateAction, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useClickOutside } from "@mantine/hooks";
import { useSpring, animated } from "react-spring";

import { Button } from "@/components";

import logo from "../assets/pears-inline.png";
import { CloseIcon } from "../Icons";
import { MenuIcon } from "../Icons";

interface IMenuProps {
  display: boolean;
  setDisplay: Dispatch<SetStateAction<boolean>>;
  canViewTheirProfile?: boolean;
}

const Menu = ({
  display,
  setDisplay,
  canViewTheirProfile = false,
}: IMenuProps) => {
  const props = useSpring({
    to: {
      opacity: display ? 1 : 0,
      transform: `translateX(${display ? 0 : 100}%)`,
    },
    from: { opacity: 0, transform: "translateX(100%)" },
    config: { duration: 200, clamp: true },
  });

  const closeOnOutsideClickRef = useClickOutside(() => setDisplay(false));

  async function handleLogout() {
    // TODO: Backend
  }

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
        onClick={() => {
          setDisplay((val) => !val);
        }}
      >
        <CloseIcon size={"2.5em"} />
      </button>

      <ul className="text-[1.5rem] text-left []">
        <Link href="/">
          <li className="hover:bg-primaryColor py-4 my-1 px-4 hover:bg-opacity-90 transition-all duration-300 rounded-md">
            <span onClick={() => setDisplay(false)}>Home</span>
          </li>
        </Link>

        <Link href="how">
          <li className="hover:bg-primaryColor py-4 my-1 px-4 hover:bg-opacity-90 transition-all duration-300 rounded-md">
            <span onClick={() => setDisplay(false)}>How does it work?</span>
          </li>
        </Link>

        <Link href="about">
          <li className="hover:bg-primaryColor py-4 my-1 px-4 hover:bg-opacity-90 transition-all duration-300 rounded-md">
            <span onClick={() => setDisplay(false)}>About us</span>
          </li>
        </Link>

        <Link href="contact">
          <li className="hover:bg-primaryColor py-4 my-1 px-4 hover:bg-opacity-90 transition-all duration-300 rounded-md">
            <span onClick={() => setDisplay(false)}>Contact us</span>
          </li>
        </Link>

        <Link href="FAQ">
          <li className="hover:bg-primaryColor py-4 my-1 px-4 hover:bg-opacity-90 transition-all duration-300 rounded-md">
            <span onClick={() => setDisplay(false)}>FAQ</span>
          </li>
        </Link>

        <li className=" ml-auto md:ml-0 md:border-none hover:bg-primaryColor py-4 my-1 px-4 hover:bg-opacity-90 transition-all duration-300 rounded-md">
          {canViewTheirProfile ? (
            <Link href={`/profile/me`}>
              <span onClick={() => setDisplay(false)}> Profile </span>
            </Link>
          ) : (
            <Link href="/login"> Sign in </Link>
          )}
        </li>
      </ul>
    </animated.div>
  );
};

export function PublicNavbar({
  canViewTheirProfile = false,
}: {
  canViewTheirProfile?: boolean;
}) {
  const [display, setDisplay] = useState<boolean>(false);

  const pathname = usePathname();

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
        className="items-center p-2 text-neutral500 rounded-lg hidden md:inline-flex hover:bg-neutral100 focus:outline-none focus:ring-2 focus:ring-lightGrayButton dark:text-neutral400 dark:hover:bg-neutral700 dark:focus:ring-grayOutline"
        onClick={() => {
          setDisplay(!display);
        }}
      >
        <MenuIcon />
      </button>

      <Menu
        display={display}
        setDisplay={setDisplay}
        canViewTheirProfile={canViewTheirProfile}
      />
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

      {canViewTheirProfile ? (
        <Button content="My profile" path="/profile/me" className="md:hidden" />
      ) : (
        <Button
          content="Start your journey"
          path="/login"
          className="md:hidden"
        />
      )}
    </div>
  );
}
