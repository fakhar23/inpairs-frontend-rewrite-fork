import { twMerge } from "tailwind-merge";
import { LoadingCircle } from ".";

interface IButtonProps {
  content: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (e?: any) => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  isInverted?: boolean;
  showChildrenOrContent?: "children" | "content";
  children?: React.ReactNode;
}

export default function Button({
  className,
  type,
  onClick,
  isDisabled,
  isLoading,
  content,
  isInverted = false,
  children,
  showChildrenOrContent = "content",
}: IButtonProps) {
  const baseClassName =
    "px-[2rem] py-[0.3rem] md:px-[5rem] md:py-[0.4rem] md:text-regular rounded-3xl text-[1.2rem] shadow-xl disabled:cursor-not-allowed";
  const invertedClassName = isInverted
    ? "bg-white border-red-500 text-black border-2"
    : "bg-red-500 text-white border-2 border-red-500 disabled:bg-gray-400 disabled:border-gray-500";
  const mergedClassName = twMerge(baseClassName, invertedClassName, className);

  return (
    <div>
      <button
        type={type}
        className={mergedClassName}
        onClick={onClick}
        disabled={isDisabled || isLoading || false}
      >
        {showChildrenOrContent === "content" && isLoading && <LoadingCircle />}
        {showChildrenOrContent === "content" && content}

        {showChildrenOrContent === "children" && children}
      </button>
    </div>
  );
}
