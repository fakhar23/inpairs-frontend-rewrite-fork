import uploadIcon from "@/assets/upload.svg";
import { Loading } from "@/components";
import Image from "next/image";
import type { ChangeEvent } from "react";
import React from "react";
import { Controller } from "react-hook-form";

const Images = ({
  name,
  control,
  error,
}: {
  name: string;
  control: any;
  error: any;
}) => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const upload = async () => undefined;

  return (
    <Controller
      control={control}
      name={name}
      // rules={{ required: 'This field is required.' }}
      render={({ field: { onChange, value: images } }) => (
        <div>
          <div className="flex flex-row gap-4">
            <div className="w-[170px] h-[170px] bg-[#F2F2F2] rounded-[10px]">
              {loading ? (
                <Loading />
              ) : (
                <>
                  <label
                    htmlFor="dropzone-file"
                    className="cursor-pointer h-full"
                  >
                    <div className="flex flex-col items-center justify-center w-full h-full my-auto">
                      <div className="flex flex-col items-center justify-center p-3 rounded-[50%] bg-[#622466]">
                        <Image src={uploadIcon} alt="upload Icon" />
                      </div>

                      <span className="mt-2">Upload Your Photos</span>
                    </div>
                  </label>

                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={async (event: ChangeEvent<HTMLInputElement>) => {
                      const links = await upload();
                      if (!links) return;
                      onChange([...links, ...images]);
                    }}
                    accept="image/png, image/jpeg, image/jpg, image/heic"
                  />
                </>
              )}
            </div>

            <div className="flex flex-row gap-4">
              {(images as string[]).map((image) => (
                <div key={image}>
                  <div style={{ position: "relative" }}>
                    {/* TODO: ADD IT Later */}
                    <button
                      type="button"
                      dangerouslySetInnerHTML={{ __html: "&times;" }}
                      className="flex flex-col items-center justify-center"
                      style={{
                        position: "absolute",
                        top: "3px",
                        right: "3px",
                        zIndex: 100,
                        color: "red",
                        fontSize: "1.25rem",
                        backgroundColor: "white",
                        borderRadius: "50%",
                        width: "25px",
                        height: "25px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        const newImages = images.filter(
                          (_: string) => _ !== image
                        );
                        onChange([...newImages]);
                      }}
                    />
                  </div>

                  <Image
                    src={image}
                    alt="profile image"
                    className="w-[170px] h-[170px] object-cover rounded-[10px] border-1 border-[#EF3E37]"
                    width={150}
                    height={150}
                  />
                </div>
              ))}
            </div>
          </div>
          {error && error.message && (
            <p className="text-red-500 text-[0.8rem]">{error.message}</p>
          )}
        </div>
      )}
    ></Controller>
  );
};

export default Images;
