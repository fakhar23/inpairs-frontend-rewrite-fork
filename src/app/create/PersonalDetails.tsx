"use client";
import { useState } from "react";

import { PopupButton } from "@typeform/embed-react";

import about from "@/assets/About Yourself.svg";
import demographics from "@/assets/Demographics.svg";
import personal from "@/assets/Personal Test.svg";
import { Card, Modal } from "@/components";

import ImagesUploader from "./ImagesUploader";

const PersonalDetails = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSubmit = () => {
    // TODO: Backend
  };

  // TODO: Backend
  const uploadedImages = 1;

  return (
    <div className="relative">
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ImagesUploader />
      </Modal>

      <div className="my-0 mx-auto flex flex-col gap-[5rem] items-center md:flex-col-reverse">
        <section className="flex gap-4 justify-center w-[100%] md:flex-col md:items-center md:justify-center">
          <PopupButton
            id={process.env.NEXT_PUBLIC_FORM_ONE_ID}
            className="flex justify-center w-[100%]"
            size={90}
            onSubmit={handleSubmit}
            // hidden={{ user_id: user?.sharableId }}
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
                Upload Pictures
                <span className="text-rose500 text-regular ml-2">
                  {uploadedImages}/3 uploaded
                </span>
              </>
            }
            icon={about}
            onClick={() => setIsOpen(true)}
          />
        </section>
      </div>
    </div>
  );
};

export default PersonalDetails;
