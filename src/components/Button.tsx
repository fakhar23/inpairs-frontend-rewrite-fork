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
    "w-fit px-4 py-2  md:text-xl rounded-lg text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none";
  const variantClassName =
    variant === "outlined"
      ? "bg-white border-primary-700 text-primary-700 border hover:bg-primary-200 hover:bg-opacity-35 active:bg-primary-200 active:bg-opacity-60"
      : "bg-primary text-white hover:bg-primary-600 active:bg-primary-700";

  const mergedClassName = twMerge(baseClassName, variantClassName, className);

  return (
    <button
      type={type}
      className={mergedClassName}
      onClick={onClick}
      disabled={isDisabled || isLoading || false}
    >
      {isLoading && <LoadingCircle />}

      {children}
    </button>
  );
}
