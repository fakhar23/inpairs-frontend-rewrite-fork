"use client";

import { ReactNode } from "react";

import { PublicNavbar } from "@/components";
import { Footer } from "@/components";

const NavbarLayout = ({
  children,
  footer,
}: {
  children: ReactNode;
  footer?: boolean;
}) => {
  return (
    <div className="relative flex flex-col justify-around">
      <PublicNavbar />
      <div className="flex justify-center items-center">{children}</div>
      {footer ? <Footer /> : <div></div>}
    </div>
  );
};

export default NavbarLayout;
