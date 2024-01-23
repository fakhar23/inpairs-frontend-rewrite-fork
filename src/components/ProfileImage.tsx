import Image from "next/image";
import { CloseIcon } from "@/Icons";

interface IImageUpload {
  url?: string;
  images: string[];
  setImages: any;
}

const ProfileImage = ({ url, images, setImages }: IImageUpload) => {
  const handleDelete = () => {
    const newImages = images.filter((e) => e !== url);
    setImages(newImages);
  };

  return (
    <div className="w-full my-5 h-[12rem] border-red500 border-[1px] rounded-xl">
      <div className="relative h-full w-full">
        <button
          className="absolute z-1 flex items-center justify-center cursor-pointer right-1 top-1"
          type="button"
          title="close"
          onClick={handleDelete}
        >
          <CloseIcon size="2rem" />
        </button>

        <Image
          className="h-full w-full object-cover rounded-xl "
          src={url || ""}
          alt="profile image"
          width={240}
          height={192}
        />
      </div>
    </div>
  );
};

export default ProfileImage;
