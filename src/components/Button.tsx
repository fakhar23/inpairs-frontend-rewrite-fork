import { twMerge } from "tailwind-merge";
import { LoadingCircle } from ".";

interface IButtonProps {
  content: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (e?: any) => void;
  isDisabled?: boolean;
  isLoading?: boolean;
}

export default function Button({
  className,
  type,
  onClick,
  isDisabled,
  isLoading,
  content,
}: IButtonProps) {
  return (
    <div>
      <button
        type={type}
        className={twMerge(
          "bg-red-500 text-white px-[2rem] py-[0.3rem] md:px-[5rem] md:py-[0.4rem] md:text-regular rounded-3xl text-[1.2rem] shadow-xl hover:bg-[#f87171] disabled:cursor-not-allowed disabled:bg-slate-300",
          className
        )}
        onClick={onClick}
        disabled={isDisabled || isLoading || false}
      >
        {isLoading && <LoadingCircle />}
        {content}
      </button>
    </div>
  );
}
