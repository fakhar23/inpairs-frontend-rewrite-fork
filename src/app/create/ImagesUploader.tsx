"use client";
import { useState } from "react";

import Image from "next/image";

import { toast } from "react-toastify";

import { Button } from "@/components";

// import { transformFileToBlobUrl } from "@/components/utils";

function ImagesUploader() {
  // TODO: Backend
  const userImages: string[] = [];

  const [images, setImages] = useState<string[]>(userImages);

  // const { mutateAsync: uploadImage, isLoading: uploading } = useUploadImage();
  // const [loading, setLoading] = useState<boolean>(false);

  // const save = useCallback(async () => {
  //   setLoading(() => true);
  //   try {
  //     if (images.length > 0) {
  //       const UploadedImages = [];
  //       for (let i = 0; i < images.length; i++) {
  //         const v = images[i];
  //         if (v.type === "file") {
  //           const res = await uploadImage(v.item);
  //           UploadedImages.push(res.data.data.image);
  //         }
  //         if (v.type === "link") {
  //           UploadedImages.push(v.item);
  //         }
  //       }
  //       await ApiHelper.saveImages(UploadedImages);
  //       dispatch({
  //         type: "UPDATE_USER_IMAGES_PICTURE",
  //         payload: { images: UploadedImages },
  //       });
  //       toast.success("Image uploaded successfully");
  //       setShowModal(false);
  //     }
  //   } catch (error) {
  //     Sentry.captureException(error);
  //     setImages(userImages);
  //     toast.error("Something went wrong while uploading images");
  //   } finally {
  //     setLoading(() => false);
  //   }
  //   return new Promise(() => true)
  // }, [setLoading, images, userImages, dispatch, setShowModal, uploadImage]);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    // try {
    //   // setLoading(true);
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
    //       const newImages = images.concat(newData.map((data) => data.url));
    //       setImages(newImages);
    //     }
    //   }
    // } catch (error) {
    //   // setLoading(false);
    // } finally {
    //   // setLoading(false);
    // }
  };

  // const isProcessing = uploading || loading;

  return (
    <div className="w-[90vw] h-[80vh] bg-white shadow-sm rounded-sm  flex flex-col justify-center items-center">
      {/* {isProcessing && (
        <div className="absolute z-20 top-0 bottom-0 right-0 left-0 flex items-center justify-center bg-black/10">
          <Loading />
        </div>
      )} */}
      <div className="relative p-1 flex items-center justify-center w-[70%] md:w-[90%] border-2	 border-dashed border-red500">
        <label
          htmlFor="dropzone-file"
          className={`group flex flex-col items-center ${
            images.length ? "justify-end py-5" : "justify-center"
          } ${
            images.length < 3 ? "cursor-pointer" : "cursor-pointer"
          } w-full h-72  rounded-lg  bg-inputNeutralLight dark:hover:bg-bray-800  hover:bg-inputNeutralMedium dark:border-x-inputNeutralMedium dark:hover:border-inputNeutralDark`}
        >
          <div>
            {!images.length && (
              <svg
                className="w-8 h-8 mb-4 mx-auto group-hover:text-red500 dark:text-neutralMedium "
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

            {images.length < 3 ? (
              <>
                {images.length < 3 ? (
                  <div className="flex flex-col items-center text-neutralMedium group-hover:text-darkPurple dark:text-neutralMedium">
                    <p className="mb-2 text-sm ">
                      <span className="font-semibold">
                        Click to upload images
                      </span>
                    </p>
                    <p className="mb-2 text-xs ">HEIC, PNG or JPG</p>
                    <p className="text-xs font-bold ">3 Pictures Max</p>
                    <input
                      id="dropzone-file"
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleChange}
                      accept="image/png, image/jpeg, image/jpg, image/heic"
                    />
                  </div>
                ) : null}
              </>
            ) : null}
          </div>
        </label>
        {!!images.length && (
          <div className="absolute top-0 flex items-center justify-center w-auto mx-auto">
            <div className="flex flex-row items-center justify-center pt-5 pb-6 gap-6">
              {images.map((imageURL) => (
                <div className="relative " key={imageURL}>
                  <button
                    type="button"
                    dangerouslySetInnerHTML={{ __html: "&times;" }}
                    className="absolute z-10 -top-[11px] left-0 flex flex-col items-center justify-center bg-white hover:bg-red500 text-red500 hover:text-white"
                    style={{
                      fontSize: "1.25rem",
                      borderRadius: "50%",
                      width: "25px",
                      height: "25px",
                      cursor: "pointer",
                    }}
                    onClick={async () => {
                      // await removeImages([file])
                      setImages((prev) => prev.filter((_) => _ !== imageURL));
                    }}
                  />
                  <Image
                    className="w-[10rem] h-[10rem] object-cover"
                    src={imageURL}
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
      {images.length > 0 ? (
        <Button
          // loading={isProcessing}
          // click={save}
          content="Save"
          className="mt-3"
        />
      ) : null}
    </div>
  );
}

export default ImagesUploader;
