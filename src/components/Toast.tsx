import React from "react";
import { IoIosWarning } from "react-icons/io";
import { twMerge } from "tailwind-merge";

interface IToast {
  message?: React.ReactNode;
  title?: React.ReactNode;
  icon?: boolean;
  type: "warn" | "info" | "error";
  onClose?: () => void;
}

const icons = {
  error: <IoIosWarning />,
  info: <IoIosWarning />,
  warn: <IoIosWarning />,
};

const colors = {
  error: "bg-red-100 border-red-500 text-rose-700",
  info: "bg-blue-100 border-blue-500 text-blue-700",
  warn: "bg-orange-100  border-orange-500 text-orange-700",
};

export const Toast = ({ message, icon, type, title, onClose }: IToast) => {
  return (
    <div
      className={twMerge(
        "flex items-center gap-1 border border-l-4 px-4 py-3 rounded relative",
        colors[type]
      )}
      role="alert"
    >
      {icon && icons[type]}
      <strong className="font-bold ">{title}: </strong>
      <span className="block sm:inline">{message}</span>
      <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
        {onClose && (
          <svg
            className="fill-current h-6 w-6 "
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Close</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
          </svg>
        )}
      </span>
    </div>
  );
};
