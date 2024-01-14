import Image from "next/image";

import { twMerge } from "tailwind-merge";

import footerBG from "@/assets/footerBG.svg";

interface IFooter {
  className?: string;
}

export function Footer({ className }: IFooter) {
  return (
    <footer
      className={twMerge(
        "px-[5rem] py-[2rem] h-[15rem] relative bg-gradient-to-r from-red-500/90 to-purple-900/90 flex gap-[2rem] justify-between items-center text-white md:flex-col md:m-0 ",
        className,
      )}
    >
      <Image
        src={footerBG}
        alt="art"
        className="absolute top-0 left-0 w-[100%] h-[100%] object-cover object-top"
      />
    </footer>
  );
}
