import Image from "next/image";

import footerBG from "@/assets/footerBG.svg";

export function Footer() {
  return (
    <footer className="px-[5rem] py-[2rem] h-[15rem] relative bg-gradient-to-r from-red-500/90 to-purple-900/90 flex gap-[2rem] justify-between items-center text-white md:flex-col md:m-0">
      <Image
        src={footerBG}
        alt="art"
        className="absolute top-0 left-0 w-[100%] h-[100%] object-cover object-top"
      />
    </footer>
  );
}
