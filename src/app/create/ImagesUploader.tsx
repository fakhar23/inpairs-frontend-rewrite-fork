"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { Button, Loading } from "@/components";
import { CldUploadWidget, CldUploadWidgetInfo } from "next-cloudinary";
import { useAuthContext } from "@/hooks/useAuthContext";
import { twMerge } from "tailwind-merge";
import { useMutation } from "@tanstack/react-query";
import { uploadImages } from "@/api";

function ImagesUploader({ onClose }: { onClose: () => void }) {
  const [images, setImages] = useState<string[]>([]);
  const user = useAuthContext();

  const uploadImagesMutation = useMutation({
    mutationFn: async (images: string[]) => {
      return await uploadImages({ images });
    },
    onSuccess(data) {
      toast.success(data.message);
    },
  });

  useEffect(() => {
    if (!user.isLoading && user.data?.images) {
      setImages(user.data.images);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.isLoading]);

  return (
    <div className="w-[90vw] h-[80vh] bg-white shadow-sm rounded-sm  flex flex-col justify-center items-center">
      {user.isLoading && (
        <div className="absolute z-20 top-0 bottom-0 right-0 left-0 flex items-center justify-center bg-black/10">
          <Loading />
        </div>
      )}
      <div className="relative p-1 flex items-center justify-center w-[70%] md:w-[90%] border-2	 border-dashed border-primary">
        <label
          className={`group flex flex-col items-center ${
            images.length ? "justify-end py-5" : "justify-center"
          } ${
            images.length < 3 ? "cursor-pointer" : "cursor-pointer"
          } w-full h-72  rounded-lg  bg-neutral-50 dark:hover:bg-gray-500  hover:bg-neutral-100 dark:border-neutral-600 dark:hover:border-neutral-500`}
        >
          <div>
            {images.length < 3 ? (
              <CldUploadWidget
                uploadPreset={
                  process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME as string
                }
                options={{
                  clientAllowedFormats: ["jpg", "jpeg", "png", "heif", "heic"],
                  multiple: true,
                  sources: ["local", "camera"],
                  showPoweredBy: false,
                }}
                onSuccess={(results) => {
                  if (
                    results.info &&
                    "secure_url" in (results.info as CldUploadWidgetInfo)
                  ) {
                    const { secure_url } = results.info as CldUploadWidgetInfo;
                    setImages((prev) => [...prev, secure_url].slice(0, 3));
                  }
                }}
              >
                {({ open }) => {
                  return (
                    <div onClick={() => open()}>
                      {!images.length && (
                        <svg
                          className="w-8 h-8 mb-4 mx-auto group-hover:text-primary dark:text-neutral-400 "
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                      )}
                      <div className="flex flex-col items-center text-neutral-500 group-hover:text-secondary dark:text-neutral-400">
                        <p className="mb-2 text-sm ">
                          <span className="font-semibold">
                            Click to upload images
                          </span>
                        </p>
                        <p className="mb-2 text-xs ">HEIC, PNG or JPG</p>
                        <p className="text-xs font-bold ">3 Pictures Max</p>
                      </div>
                    </div>
                  );
                }}
              </CldUploadWidget>
            ) : null}
          </div>
        </label>
        {!!images.length && (
          <div
            className={twMerge(
              "absolute top-0 flex items-center justify-center w-auto mx-auto",
              images.length >= 3 ? "h-full" : ""
            )}
          >
            <div className="flex flex-row items-center justify-center pt-5 pb-6 gap-6">
              {images.map((currentImage) => (
                <div className="relative " key={currentImage}>
                  <button
                    type="button"
                    className="absolute z-10 -top-[11px] left-0 flex flex-col items-center justify-center bg-white hover:bg-primary text-primary hover:text-white"
                    style={{
                      fontSize: "1.25rem",
                      borderRadius: "50%",
                      width: "25px",
                      height: "25px",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      setImages((prev) =>
                        prev.filter((image) => image !== currentImage)
                      )
                    }
                  >
                    &times;
                  </button>
                  <Image
                    className="w-[10rem] h-[10rem] object-cover"
                    src={currentImage}
                    alt={"image"}
                    width={160}
                    height={160}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {
        <Button
          className="mt-3"
          onClick={async () => {
            await uploadImagesMutation.mutateAsync(images);
            await user.refetch();
            onClose();
          }}
          isLoading={uploadImagesMutation.isPending}
          isDisabled={
            !images.length || user.isFetching || uploadImagesMutation.isPending
          }
        >
          Save Images
        </Button>
      }
    </div>
  );
}

export default ImagesUploader;
