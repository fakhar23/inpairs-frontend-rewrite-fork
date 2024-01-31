import { ReactHTML, createElement } from "react";
import { twMerge } from "tailwind-merge";

export function TextSkeleton({
  children,
  as,
  className,
  showText,
}: {
  children: React.ReactNode;
  as: keyof ReactHTML;
  className?: string;
  showText: boolean;
}) {
  return createElement(
    as,
    {
      className: twMerge(
        showText
          ? ""
          : "animate-pulse inline-block bg-slate-200 rounded mb-[-3px]",
        className
      ),
    },
    createElement(
      "span",
      {
        className: showText ? "" : "invisible",
      },
      children
    )
  );
}
