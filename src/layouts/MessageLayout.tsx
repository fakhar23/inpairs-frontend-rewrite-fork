"use client";

import { ReactNode } from "react";
import Image from "next/image";
import bg from "@/assets/circles-bg.svg";
import { twMerge } from "tailwind-merge";

export function MessageLayout({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={twMerge(
        "flex justify-center items-center  w-[80vw] my-0 m-auto bg-white md:flex-col-reverse md:items-center md:w-[60%] rounded-lg sm:w-[80%] shadow-lg",
        className
      )}
    >
      <Image
        src={bg}
        alt="circles background"
        className="absolute blur-xl top-0 left-0 z-[-1] w-[100%] h-[100vh] object-cover object-top"
      />
      <div className="w-[50%] p-[3rem] md:w-full">
        <h2
          className={`text-center text-[2.6rem] mb-[0.5rem] md:text-[2.2rem] font-funky`}
        >
          <span className="text-primary">InPairs</span>
        </h2>
        {children}
      </div>
    </div>
  );
}
