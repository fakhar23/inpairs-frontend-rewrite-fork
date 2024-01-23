import React from "react";

import Image from "next/image";

interface ICard {
  title?: React.ReactNode;
  icon?: string;
  isCompleted?: boolean;
  onClick?: () => void;
}
export const Card = ({ title, icon, isCompleted = false, onClick }: ICard) => {
  return (
    <div
      className="flex items-center justify-center w-[100%] min-h-[200px] py-[2rem] md:py-[3rem]  md:mb-[2rem] rounded-xl border-slate200 shadow-md transition duration-200 ease-in-out hover:shadow-xl cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-col items-center gap-[1rem]">
        {isCompleted ? (
          <div className="h-[5rem] w-[5rem] rounded-full text-white bg-red500 text-3xl flex justify-center items-center mb-[1rem]">
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
        <h3 className="text-slate600 font-bold text-[1.1rem] md:text-regular">
          {title}
        </h3>
      </div>
    </div>
  );
};
