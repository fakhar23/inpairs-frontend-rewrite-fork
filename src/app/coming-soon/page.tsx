"use client";
import ClipLoader from "react-spinners/ClipLoader";
import { randomId, useTimeout } from "@mantine/hooks";
import { useState } from "react";
import { PublicNavbar } from "@/components/PublicNav";

const Gate = () => {
  const loading = false;
  const user = {
    firstName: "john",
  };

  return (
    <div className="h-fit md:mt-[1rem] md:p-[2rem] w-screen flex justify-center">
      <div className="w-[90%] pb-[4rem] shadow-xl flex justify-center flex-col items-center gap-10 md:p-[1rem] md:pb-[10rem]">
        <p className={`text-large text-red font-funky md:text-[30px]`}>
          Inpairs
        </p>
        <p className="md:text-[15px] text-center">
          Hi {!loading && user.firstName}, Thank you for your interest in
          inpairs! Right now, we only operate in the US and Canada. We’re doing
          our best to get to your country soon.
        </p>
      </div>
    </div>
  );
};

export default function ComingSoonPage() {
  return (
    <>
      <PublicNavbar />
      <div className="w-[100%] mb-5 md:h-screen flex justify-center relative">
        <Gate />
      </div>
    </>
  );
}
