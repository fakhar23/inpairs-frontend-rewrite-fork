import { Skeleton as MUISkeleton, SkeletonProps } from "@mui/material";

interface ISkeleton extends SkeletonProps {
  isLoading: boolean;
  children: React.ReactNode;
}

export function Skeleton({
  children,
  isLoading,
  variant = "rounded",
  animation = "wave",
  ...props
}: ISkeleton) {
  return isLoading ? (
    <MUISkeleton
      variant={variant}
      animation={animation}
      style={{ borderRadius: "10px", ...props.style }}
      {...props}
    />
  ) : (
    children
  );
}
