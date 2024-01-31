import React from "react";
import { twMerge } from "tailwind-merge";

export interface IGeneral {
  title: string;
  content: { answer: string; descriptor: string };
  className?: string;
}

export const GeneralInfo = ({ title, content, className = "" }: IGeneral) => {
  return (
    <div
      className={twMerge(
        className,
        "min-h-[10rem] w-full relative border border-red-500 h-content flex flex-col flex-grow-1 h-content"
      )}
    >
      <div className="flex justify-between items-center">
        <div className="font-bryantProBold text-purple text-[1.25rem]">
          {title}
        </div>
      </div>
      <div className="flex-1">
        <textarea
          className="min-h-[100%] w-full resize-y focus:outline-none bg-white"
          disabled
          defaultValue={content.answer}
        />
      </div>
    </div>
  );
};
