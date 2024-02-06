import { LoaderIcon } from "@/Icons";

export const Loading = () => {
  return (
    <div role="status" className="flex justify-center items-center p-10 h-100">
      <LoaderIcon />
      <span className="sr-only">Loading...</span>
    </div>
  );
};
