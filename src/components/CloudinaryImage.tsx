import { transformCloudinaryURL } from "./utils";
import Image from "next/image";

export const CloudinaryImage = ({
  url,
  className,
  loading,
  fallback,
  width,
  height,
  alt = "",
  asLink = true,
}: {
  url: string | undefined;
  fallback: string;
  className: string;
  loading?: "eager" | "lazy";
  width: number;
  height: number;
  alt?: string;
  asLink?: boolean;
}) => {
  return asLink ? (
    <a className="relative cursor-pointer" href={url} target="_blank">
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
    </a>
  ) : (
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
