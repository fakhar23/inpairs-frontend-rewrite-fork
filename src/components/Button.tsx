import { twMerge } from "tailwind-merge";
import { LoadingCircle } from ".";

export interface IButtonProps {
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (e?: any) => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  variant?: "outlined" | "filled";
  children?: React.ReactNode;
}

export default function Button({
  className,
  type,
  onClick,
  isDisabled,
  isLoading,
  variant = "filled",
  children,
}: IButtonProps) {
  const baseClassName =
    "w-fit px-4 py-2 md:px-6 md:py-3 md:text-xl rounded-lg text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none";
  const variantClassName =
    variant === "outlined"
      ? "bg-white border-red-700 text-red-700 border-1 hover:bg-red-50 active:bg-rose-100 "
      : "bg-red-500 text-white hover:bg-red-600 active:bg-red-700 ";
  const mergedClassName = twMerge(baseClassName, variantClassName, className);

  return (
    <div>
      <button
        type={type}
        className={mergedClassName}
        onClick={onClick}
        disabled={isDisabled || isLoading || false}
      >
        {isLoading && <LoadingCircle />}

        {children}
      </button>
    </div>
  );
}
