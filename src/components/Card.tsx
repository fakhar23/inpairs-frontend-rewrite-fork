import React from "react";
import Image from "next/image";

import { LoaderIcon } from "@/icons";
import { twMerge } from "tailwind-merge";

function Loading() {
  return (
    <div role="status" className="flex justify-center items-center">
      <LoaderIcon />
      <span className="sr-only">Loading...</span>
    </div>
  );
}

interface ICard {
  title?: React.ReactNode;
  icon?: string;
  isCompleted?: boolean;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}
export const Card = ({
  title,
  icon,
  isCompleted = false,
  onClick,
  loading,
  disabled,
  className,
}: ICard) => {
  return (
    <div
      className={twMerge(
        "flex items-center justify-center w-[100%] py-[2rem] h-full md:mb-[2rem] rounded-xl border-slate-200 shadow-md transition duration-200 ease-in-out hover:shadow-xl cursor-pointer",
        className
      )}
      onClick={disabled ? undefined : onClick}
    >
      <div className="flex flex-col items-center gap-[1rem]">
        {loading ? (
          <Loading />
        ) : isCompleted ? (
          <div className="h-[5rem] w-[5rem] rounded-full text-white bg-primary text-3xl flex justify-center items-center mb-[1rem]">
            &#x2713;
          </div>
        ) : (
          <>
            {icon && (
              <Image
                src={icon}
                alt="icon"
                className="w-[3rem] h-[3rem] "
                width={48}
                height={48}
              />
            )}
          </>
        )}
        <h3 className="text-slate-600 font-bold text-[1.1rem] md:text-regular">
          {title}
        </h3>
      </div>
    </div>
  );
};
