"use client";

import { PopupButton, Widget } from "@typeform/embed-react";

import about from "@/assets/About Yourself.svg";
import demographics from "@/assets/Demographics.svg";
import personal from "@/assets/Personal Test.svg";
import { Card, Modal } from "@/components";
import { useAuthContext } from "@/hooks/useAuthContext";
import ImagesUploader from "./ImagesUploader";
import { useState } from "react";

const PersonalDetails = () => {
  const [isImageModalOpened, setIsImageModalOpened] = useState<boolean>(false);
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
    completedFirstForm,
    completedSecondForm,
  } = user.data || {};
  const handleSubmit = () => {
    // TODO: Backend
  };

  // preset
  return (
    <div className="relative">
      <Modal
        isOpen={isImageModalOpened}
        onClose={() => setIsImageModalOpened(false)}
      >
        <ImagesUploader onClose={() => setIsImageModalOpened(false)} />
      </Modal>

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
            <Card
              title="Demographics"
              icon={demographics}
              loading={user.isLoading}
              disabled={completedFirstForm || user.isLoading}
              isCompleted={completedFirstForm}
            />
          </PopupButton>

          <PopupButton
            id={process.env.NEXT_PUBLIC_FORM_TWO_ID as string}
            size={90}
            className="flex justify-center w-[100%]"
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
          >
            <Card
              title="Personal Test"
              icon={personal}
              loading={user.isLoading}
              disabled={completedSecondForm || user.isLoading}
              isCompleted={completedSecondForm}
            />
          </PopupButton>

          <Card
            title={
              <>
                <div>Upload Pictures</div>
                <span className="text-primary-200 text-regular ml-2">
                  {numberOfUploadedImages}/3 uploaded
                </span>
              </>
            }
            loading={user.isLoading}
            disabled={numberOfUploadedImages === 3 || user.isLoading}
            isCompleted={numberOfUploadedImages === 3}
            icon={about}
            onClick={() => setIsImageModalOpened(true)}
          />
        </section>
      </div>
    </div>
  );
};

export default PersonalDetails;
