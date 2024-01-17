import { transformCloudinaryURL } from "./utils";
import Image from "next/image";

export const CloudinaryImage = ({
  url,
  className,
  loading,
  fallback,
  width,
  height,
  alt,
}: {
  url: string | undefined;
  fallback: string;
  className: string;
  loading?: "eager" | "lazy";
  width: number;
  height: number;
  alt: string;
}) => {
  return (
    <Image
      src={
        transformCloudinaryURL(url, {
          width: width * 2,
          height: height * 2,
        }) || fallback
      }
      className={className}
      loading={loading}
      alt={alt}
      width={width}
      height={height}
    />
  );
};
