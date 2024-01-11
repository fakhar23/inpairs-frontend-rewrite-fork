import LoaderIcon from "../../public/loaderIcon.svg";

const Loading = () => {
  return (
    <div role="status" className="flex justify-center items-center p-10 h-100">
      <LoaderIcon />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loading;
