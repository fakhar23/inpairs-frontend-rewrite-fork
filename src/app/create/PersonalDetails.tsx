"use client";

import { PopupButton } from "@typeform/embed-react";

import about from "@/assets/About Yourself.svg";
import demographics from "@/assets/Demographics.svg";
import personal from "@/assets/Personal Test.svg";
import { Card, Modal } from "@/components";
import { useAuthContext } from "@/hooks/useAuthContext";
import ImagesUploader from "./ImagesUploader";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { ingestTypeformResponse } from "@/api";
import { TypeformResponseIngestRequest } from "@/api/types";
import { toast } from "react-toastify";

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

  const ingestResponseMutation = useMutation({
    mutationFn: async (payload: TypeformResponseIngestRequest) => {
      return await ingestTypeformResponse(payload);
    },
    onSuccess({ message }) {
      toast.success(message);
    },
  });

  const handleSubmit = async (payload: TypeformResponseIngestRequest) => {
    await ingestResponseMutation.mutateAsync(payload);
    await user.refetch();
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

      <div className="my-0 gap-[5rem] items-center ">
        <section className="flex gap-4 justify-center flex-wrap">
          <PopupButton
            id={process.env.NEXT_PUBLIC_FORM_ONE_ID}
            className="flex justify-center"
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
            buttonProps={{
              disabled:
                completedFirstForm ||
                user.isLoading ||
                ingestResponseMutation.isPending,
            }}
          >
            <Card
              className="w-[200px] md:w-[150px] "
              title="Demographics"
              icon={demographics}
              loading={user.isLoading || ingestResponseMutation.isPending}
              disabled={
                completedFirstForm ||
                user.isLoading ||
                ingestResponseMutation.isPending
              }
              isCompleted={completedFirstForm}
            />
          </PopupButton>

          <PopupButton
            id={process.env.NEXT_PUBLIC_FORM_TWO_ID as string}
            size={90}
            className="flex justify-center"
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
            buttonProps={{
              disabled:
                completedSecondForm ||
                user.isLoading ||
                ingestResponseMutation.isPending,
            }}
          >
            <Card
              className="w-[200px] md:w-[150px]"
              title="Personal Test"
              icon={personal}
              loading={user.isLoading || ingestResponseMutation.isPending}
              disabled={
                completedSecondForm ||
                user.isLoading ||
                ingestResponseMutation.isPending
              }
              isCompleted={completedSecondForm}
            />
          </PopupButton>

          <Card
            className="w-[200px] md:w-[150px]"
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
