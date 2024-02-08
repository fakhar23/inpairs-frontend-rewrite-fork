"use client";

import { ReactNode } from "react";

import { GateNavbar } from "@/components";
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
      <GateNavbar />
      <div className={twMerge("flex grow", contentClassName)}>{children}</div>
      {footer ? <Footer /> : <div></div>}
    </div>
  );
};

export default NavbarLayout;
