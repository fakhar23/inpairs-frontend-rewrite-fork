"use client";
import ClipLoader from "react-spinners/ClipLoader";
import { randomId, useTimeout } from "@mantine/hooks";
import { useState } from "react";
import Gate from "./components/Gate";
import { PublicNavbar } from "@/components/PublicNav";

const ComingSoonPage = () => {
  const [temp, setTemp] = useState("");
  useTimeout(() => setTemp(randomId()), 1000, {
    autoInvoke: true,
  });

  if (!temp) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <ClipLoader color="#EF3E37" size={75} aria-label="Loading..." />
      </div>
    );
  }

  return (
    <>
      <PublicNavbar />
      <div className="w-[100%] mb-5 md:h-screen flex justify-center relative">
        <Gate />
      </div>
    </>
  );
};

export default ComingSoonPage;
