"use client";

import { PopupButton, Widget } from "@typeform/embed-react";
import { CldUploadWidget } from "next-cloudinary";

import about from "@/assets/About Yourself.svg";
import demographics from "@/assets/Demographics.svg";
import personal from "@/assets/Personal Test.svg";
import { Card } from "@/components";
import { useAuthContext } from "@/hooks/useAuthContext";

const PersonalDetails = () => {
  const user = useAuthContext();

  const {
    numberOfUploadedImages,
    uid,
    email,
    gender,
    phone,
    firstName,
    lastName,
    dateOfBirth,
  } = user.data || {};
  const handleSubmit = () => {
    // TODO: Backend
  };

  // preset
  return (
    <div className="relative">
      <div className="my-0 mx-auto flex flex-col gap-[5rem] items-center md:flex-col-reverse">
        <section className="flex gap-4 justify-center w-[100%] md:flex-col md:items-center md:justify-center">
          <PopupButton
            id={process.env.NEXT_PUBLIC_FORM_ONE_ID}
            className="flex justify-center w-[100%]"
            size={90}
            onSubmit={handleSubmit}
            hidden={{
              user_id: uid,
              email,
              gender,
              phone_number: phone,
              first_name: firstName,
              last_name: lastName,
              date_of_birth: dateOfBirth,
            }}
            disabled={true}
          >
            <Card title="Demographics" icon={demographics} />
          </PopupButton>

          <PopupButton
            id={process.env.NEXT_PUBLIC_FORM_TWO_ID}
            size={90}
            className="flex justify-center w-[100%]"
            onSubmit={handleSubmit}
            // hidden={{ user_id: user?.sharableId }}
          >
            <Card title="Personal Test" icon={personal} />
          </PopupButton>

          <Card
            title={
              <>
                <span className="text-rose-500 text-regular ml-2">
                  {numberOfUploadedImages}/3 uploaded
                </span>
                <CldUploadWidget
                  uploadPreset={
                    process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME as string
                  }
                  options={{
                    clientAllowedFormats: [
                      "jpg",
                      "jpeg",
                      "png",
                      "heif",
                      "heic",
                    ],
                    multiple: true,
                    maxFiles: 3,
                    sources: ["local", "camera"],
                    showPoweredBy: false,
                  }}
                >
                  {({ open, results }) => {
                    results?.info;
                    return (
                      <button onClick={() => open()}>Upload Pictures</button>
                    );
                  }}
                </CldUploadWidget>
              </>
            }
            icon={about}
          />
        </section>
      </div>
    </div>
  );
};

export default PersonalDetails;
