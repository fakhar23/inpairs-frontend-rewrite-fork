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
        "relative flex flex-col justify-around min-h-[100vh]",
        containerClassName
      )}
    >
      <PublicNavbar />
      <div className={twMerge("flex items-stretch grow", contentClassName)}>
        {children}
      </div>
      {footer ? <Footer /> : <div></div>}
    </div>
  );
};

export default NavbarLayout;
