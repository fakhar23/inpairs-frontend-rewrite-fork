// this library complains on Error: Cannot find module 'fs'
import convert from "heic-convert/browser";

export const transformFileToBlobUrl = async (file: File) => {
  if (file) {
    if (file.type.includes("heic") || file.type.includes("heif")) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const result = await convert({
        buffer,
        format: "JPEG",
        quality: 0.75,
      });

      const converted = new Blob([result], { type: "image/jpeg" });

      return URL.createObjectURL(converted);
    } else {
      return URL.createObjectURL(file);
    }
  } else {
    return "";
  }
};
