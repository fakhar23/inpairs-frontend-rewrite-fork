import React, { useState } from "react";
import { UploadIcon } from "@/Icons";

export const MAX_FILE_SIZE = 15000000;
export const SUPPORTED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
export const SUPPORTED_EXTENSIONS = ["heic", "heif"];

interface IImageUpload {
  url?: string;
  images: string[];
  setImages: any;
}

const ImageUploader = ({ images, setImages }: IImageUpload) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: any) => {
    const file = e.target.files[0];
    if (file.size > MAX_FILE_SIZE) {
      setError("File is too large!");
    } else if (
      !SUPPORTED_TYPES.includes(file.type) &&
      !SUPPORTED_EXTENSIONS.includes(file.name.split(".").pop().toLowerCase())
    ) {
      setError("Unsupported file type!");
    }
  };

  return (
    <label>
      <div className="w-full my-5 h-[12rem]">
        <div className="h-full w-full z-1 bg-mediumSlate flex flex-col gap-5 items-center justify-center cursor-pointer bg-opacity-[0.2] rounded-xl">
          <UploadIcon />
          <p className="text-mediumSlate">upload your photos</p>
        </div>

        <input hidden type="file" name="file" onChange={handleChange} />

        <p className="text-red">{error}</p>
      </div>
    </label>
  );
};

export default ImageUploader;
