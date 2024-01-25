import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { LoadingCircle } from ".";
import loadingBtnSvg from "@/assets/loading-btn.svg";

/**
 * ! Both LinkButton and ClickButton components have the same classes(same styles) and similar props.
 * *: The main difference is that LinkButton has a 'path' Prop and is wrapped in a 'Link' component for client-side navigation.
 * * ClickButton, on the other hand, does not have a 'path' Prop and is not wrapped in a 'Link' component.
 */

interface ILinkButtonProps {
  content: string;
  type?: "button" | "submit" | "reset";
  path?: string;
  onClick?: (e: React.SyntheticEvent) => void;
  className?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
}

export default function LinkButton({
  content,
  path,
  onClick,
  className,
  isDisabled,
  isLoading = false,
  type = "button",
}: ILinkButtonProps) {
  return (
    <Link href={path ? path : ""} className={className}>
      <button
        type={type}
        className={twMerge(
          "bg-red-500 text-white px-[2rem] py-[0.3rem] md:px-[5rem] md:py-[0.4rem] md:text-regular rounded-3xl text-[1.2rem] shadow-xl hover:bg-[#f87171] disabled:cursor-not-allowed disabled:bg-slate-300",
          className
        )}
        onClick={(e) => onClick?.(e)}
        disabled={isDisabled || isLoading || false}
      >
        {isLoading && <LoadingCircle />}
        {content}
      </button>
    </Link>
  );
}
