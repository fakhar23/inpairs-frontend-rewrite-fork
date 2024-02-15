import uploadIcon from "@/assets/upload.svg";
// import { transformFileToBlobUrl } from "./utils";
import Image from "next/image";
import React from "react";
import { toast } from "react-toastify";
import * as Sentry from "@sentry/nextjs";

const RegularImages = ({
  name,
  error,
  images,
  setImages,
  setLoading,
}: {
  name: string;
  error: string;
  images: any[];
  setImages: (newVal: any[]) => void;
  setLoading: (v: boolean) => void;
}) => {
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    // try {
    //   setLoading(true);
    //   if (event.target.files) {
    //     const sizes = Array.from(event.target.files).map(
    //       (file) => file.size / 1024 / 1024
    //     );
    //     if (sizes.some((size) => size > 3)) {
    //       toast.error("File size must be less than 3 MB");
    //       return;
    //     }
    //     const filesUploaded = Array.from(event.target.files);
    //     const limit = 3 - images.length;
    //     if (limit > 0 && limit < 4) {
    //       const newData = await Promise.all(
    //         [...filesUploaded].slice(0, limit).map(async (v) => ({
    //           type: "file",
    //           item: v,
    //           url: await transformFileToBlobUrl(v),
    //         }))
    //       );
    //       const newImages = images.concat(newData);
    //       setImages(newImages);
    //     }
    //   }
    // } catch (error) {
    //   Sentry.captureException(error);
    //   setLoading(false);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div>
      <div className="flex flex-row gap-4">
        <div className="w-[170px] h-[170px] bg-gray-100 rounded-[10px]">
          <label htmlFor="dropzone-file" className="cursor-pointer h-full">
            <div className="flex flex-col items-center justify-center w-full h-full my-auto">
              <div className="flex flex-col items-center justify-center p-3 rounded-[50%] bg-secondary">
                <Image src={uploadIcon} alt="upload Icon" />
              </div>
              <span className="mt-2">Upload Your Photos</span>
            </div>
          </label>

          <input
            id="dropzone-file"
            type="file"
            disabled={images.length === 3}
            name={name}
            className="hidden"
            onChange={handleChange}
            multiple
            accept="image/png, image/jpeg, image/jpg, image/heic"
          />
        </div>

        <div className="flex flex-row gap-4">
          {images.map((v, i) => (
            <div key={i}>
              <div style={{ position: "relative" }}>
                {/* TODO: ADD IT Later */}
                <button
                  type="button"
                  dangerouslySetInnerHTML={{ __html: "&times;" }}
                  className="flex flex-col items-center justify-center bg-white text-primary hover:bg-primary hover:text-white"
                  style={{
                    position: "absolute",
                    top: "3px",
                    right: "3px",
                    zIndex: 10,
                    fontSize: "1.25rem",
                    borderRadius: "50%",
                    width: "25px",
                    height: "25px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setImages(images.filter((_: string) => _ !== v));
                  }}
                />
              </div>

              <Image
                src={v.url}
                alt="profile image"
                className="w-[170px] h-[170px] object-cover rounded-[10px] border-1 border-primary"
                width={150}
                height={150}
              />
            </div>
          ))}
        </div>
      </div>

      {error && <p className="text-red-500 text-[0.8rem]">{error}</p>}
    </div>
  );
};

export default RegularImages;
