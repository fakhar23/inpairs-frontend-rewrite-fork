import { twMerge } from "tailwind-merge";
import { LoadingCircle } from ".";

interface IClickButtonProps {
  content: string;
  classes?: string;
  type?: "button" | "submit" | "reset";
  click?: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
}

export function ClickButton({
  classes,
  type,
  click,
  isDisabled,
  isLoading,
  content,
}: IClickButtonProps) {
  return (
    <div className={classes}>
      <button
        type={type}
        className={twMerge(
          "bg-red-500 text-white px-[2rem] py-[0.3rem] md:px-[5rem] md:py-[0.4rem] md:text-regular rounded-3xl text-[1.2rem] shadow-xl hover:bg-[#f87171] disabled:cursor-not-allowed disabled:bg-slate-300",
          classes
        )}
        onClick={click}
        disabled={isDisabled || isLoading || false}
      >
        {isLoading && <LoadingCircle />}
        {content}
      </button>
    </div>
  );
}
