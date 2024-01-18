"use client";

import { ReactNode } from "react";

import { PublicNavbar } from "@/components";
import { Footer } from "@/components";
import { twMerge } from "tailwind-merge";

const NavbarLayout = ({
  children,
  footer,
  containerClassName,
  contentClassName,
}: {
  children: ReactNode;
  footer?: boolean;
  containerClassName?: string;
  contentClassName?: string;
}) => {
  return (
    <div
      className={twMerge(
        "relative flex flex-col justify-around",
        containerClassName
      )}
    >
      <PublicNavbar />
      <div
        className={twMerge(
          "flex justify-center items-center",
          contentClassName
        )}
      >
        {children}
      </div>
      {footer ? <Footer /> : <div></div>}
    </div>
  );
};

export default NavbarLayout;
