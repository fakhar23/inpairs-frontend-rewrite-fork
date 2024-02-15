import Image from "next/image";

import { twMerge } from "tailwind-merge";

import footerBG from "@/assets/footerBG.svg";
import Link from "next/link";
import logo from "@/assets/pears-inline.png";

interface IFooter {
  className?: string;
}

export function Footer({ className }: IFooter) {
  return (
    <footer
      className={twMerge(
        "px-[5rem] md:p-[2rem] py-[2rem] relative text-gray-400 md:m-0 bg-gray-800 ",
        className
      )}
    >
      <div className="grid grid-cols-2 md:grid-cols-1 gap-[2rem] w-full border-b-2 border-gray pb-8">
        <div className="">
          <Link href="/">
            <Image
              src={logo}
              alt="pairs logo"
              className="w-[7rem] mb-4"
              priority={true}
            />
          </Link>
          <p>
            Inpairs is a service that brings the 21st <br />
            century to Muslim matchmaking.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-1 gap-[2rem] w-fit">
          <div>
            <p className="text-white mb-4 text-lg">Social Media</p>
            <Link
              className="block mb-2"
              href={"https://www.instagram.com/inpairs.io/"}
            >
              Instagram
            </Link>
            <Link
              className="block mb-2"
              href={"https://www.tiktok.com/@zachelkordy"}
            >
              Tiktok
            </Link>
          </div>
          <div>
            <p className="text-white mb-4 text-lg">Contact Us</p>
            <Link className="block mb-2" href={"mailto:zachariah@inpairs.io"}>
              zachariah@inpairs.io
            </Link>
            <Link className="block mb-2" href={"tel:+12345678890"}>
              +1234 5678 890
            </Link>
          </div>
        </div>
      </div>
      <p className="py-8">
        Copyright © 2024 Inpairs Team. All Rights Reserved.
      </p>
    </footer>
  );
}
