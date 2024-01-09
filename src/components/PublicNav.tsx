"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Button from "@/components/Button";

import logo from "../../public/pears-inline.png";

export function PublicNavbar({
  canViewTheirProfile = false,
}: {
  canViewTheirProfile?: boolean;
}) {
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
