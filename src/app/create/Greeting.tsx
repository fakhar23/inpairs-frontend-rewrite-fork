"use client";
import React from "react";

import Image from "next/image";

import greet from "@/assets/greet2.jpg";

const Greeting = () => {
  return (
    <div className="flex flex-col gap-5 items-between relative h-[20rem] p-1">
      <div className="flex justify-center flex-col items-center ">
        <Image src={greet} alt="greet" className="w-[50%] md:w-[100%]" />
        <p className="text-gray-gunmetal text-xl text-center md:text-regular md:leading-10">
          You're one step closer to finding your naseeb! The inpairs team has
          your back (but not the mahr fees).
        </p>
      </div>
    </div>
  );
};

export default Greeting;
