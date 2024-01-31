"use client";
import Image from "next/image";

import logo from "@/assets/pears-inline.png";

export const SplashScreen = () => {
  return (
    <div className="w-[100vw] h-[100vh] bg-white max-h-screen max-w-[100vw] overflow-hidden">
      <div className="animate-zoom flex flex-col justify-center items-center h-full w-full">
        <Image
          src={logo}
          alt="inpairs logo"
          className="w-[8rem]"
          priority={true}
        />
        <h1 className={`text-xl font-bold text-darkBlackText mt-5 font-funky`}>
          Loading...
        </h1>
      </div>
    </div>
  );
};
