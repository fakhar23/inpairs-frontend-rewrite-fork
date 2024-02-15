"use client";

import React, { useState } from "react";
import { Button, Input, Link } from "@/components";
import { BsFillTelephoneInboundFill, BsInstagram } from "react-icons/bs";
import { CloudinaryImage, Modal, Pooling } from "@/components";
import { useGetMatch } from "@/hooks/useGetMatch";
import { useForm } from "react-hook-form";
import { MatchRejectionSurveyPayload, UpdateMatchRequest } from "@/api/types";
import { useMutation } from "@tanstack/react-query";
import { updateMatch } from "@/api";
import { toast } from "react-toastify";

const StatusComponent = ({
  onAccept,
  onDecline,
}: {
  onAccept: () => void;
  onDecline: () => void;
}) => {
  const match = useGetMatch();

  if (
    match.data?.userResponse === "ACCEPTED" &&
    match.data.matchResponse === "ACCEPTED"
  ) {
    return (
      <div className="gap-4 items-center text-black">
        <h3 className="text-[20px] font-semibold tracking-[0.6px] capitalize md:text-[16px]">
          Congrats! Your match is here
        </h3>
        <div className="flex items-center gap-4  text-black">
          <div className="flex items-center gap-1">
            <BsFillTelephoneInboundFill /> {match.data?.phoneNumber}
          </div>
          <div className="border-[0.4px] border-secondary h-[1.25rem] inline" />

          <div className="flex items-center gap-1">
            <BsInstagram />
            {match.data.igHandle}
          </div>
        </div>
      </div>
    );
  } else if (match.data?.userResponse === "ACCEPTED") {
    return (
      <div className="flex  gap-4 items-center text-black">
        <h3 className="text-[20px] font-semibold tracking-[0.6px] capitalize md:text-[16px]">
          You've accepted your match!
        </h3>
      </div>
    );
  } else if (match.data?.userResponse === "REJECTED") {
    return (
      <div className="flex  gap-4 items-center text-black">
        <h3 className="text-[20px] font-semibold tracking-[0.6px] capitalize md:text-[16px]">
          You've rejected your match!
        </h3>
      </div>
    );
  } else if (match.data?.userResponse === "PENDING") {
    return (
      <div className="flex  gap-10 w-full">
        <span
          onClick={onAccept}
          className="text-green-500 cursor-pointer hover:text-green-300 transition-all ease-out duration-300"
        >
          Accept
        </span>
        <span
          onClick={onDecline}
          className="text-red-400 cursor-pointer hover:text-red-600 transition-all ease-out duration-300"
        >
          Decline
        </span>
      </div>
    );
  }
};

const MatchCard = () => {
  const match = useGetMatch();
  const updateMatchResponseMutation = useMutation({
    mutationFn: async (data: UpdateMatchRequest) => {
      return await updateMatch(data);
    },
    onSuccess({ message }) {
      toast.success(message);
    },
  });
  const [isAcceptanceModalOpened, setIsAcceptanceModalOpened] =
    useState<boolean>(false);
  const [isRejectionModalOpened, setIsRejectionModalOpened] =
    useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MatchRejectionSurveyPayload>();

  return (
    <>
      <div className="flex justify-between items-center shadow-xl rounded-xl p-2 ml-16 md:ml-4 my-7 ms:flex-col ms:h-auto ms:gap-3">
        <div className="flex items-center gap-5 md:gap-2 ms:flex-col">
          <CloudinaryImage
            url={match.data?.images?.[0]}
            fallback="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMx1itTXTXLB8p4ALTTL8mUPa9TFN_m9h5VQ&usqp=CAU"
            alt={`${match.data?.firstName}`}
            width={132}
            height={132}
            className="rounded-lg h-[132px] w-[132px] object-cover md:h-[100px] md:w-[100px] ms:w-full ms:h-[200px]  ms:min-w-[300px] "
          />

          <div className="flex flex-col py-2 gap-10 md:gap-8 ms:w-full">
            <div className="flex gap-20 xl:gap-8 ld:gap-20 md:gap-4 ms:gap-0 ms:justify-between">
              <div className="flex flex-col justify-between whitespace-nowrap">
                <h3 className="text-[20px] font-semibold tracking-[0.6px] capitalize md:text-[16px]">
                  {match.data?.firstName} {match.data?.lastName || ""}
                </h3>

                <div className="flex gap-4 items-center text-black">
                  <span>{match.data?.age} years</span>
                  <div className="border-[0.4px] border-secondary h-[1.25rem] inline" />
                </div>
              </div>
              <Link
                href={`/profile/${match.data?.matchedUserId}`}
                className="flex items-center whitespace-nowrap bg-secondary text-white px-[2rem] h-[42px] rounded-3xl text-[1rem] focus:outline-none focus:shadow-outline hover:bg-secondary transition-all ease-out duration-300  md:h-[36px] md:text-[14px]  "
              >
                View Profile
              </Link>
            </div>

            <StatusComponent
              onAccept={() => setIsAcceptanceModalOpened(true)}
              onDecline={() => setIsRejectionModalOpened(true)}
            />
          </div>
        </div>

        <div className="h-full flex justify-center items-center mr-12 ld:flex ld:mr-5 md:mr-3 ">
          {/* <CountdownTimer targetDate={'2023-10-04T01:00:00'} /> */}
        </div>
      </div>

      <Modal
        title="Confirm Match Acceptance"
        titleClassName="!text-2xl"
        isOpen={isAcceptanceModalOpened}
        onClose={() => setIsAcceptanceModalOpened(false)}
      >
        <div className="flex flex-col items-center justify-center w-[30rem]">
          <h2 className="text-center text-title text-2xl font-bryantProMedium mt-7">
            Are you sure you want to accept
            <span className="text-title"> {match.data?.firstName}</span> as your
            match?
          </h2>

          <div className="flex justify-center w-full mt-8 gap-2">
            <Button
              onClick={() => setIsRejectionModalOpened(false)}
              variant="outlined"
            >
              Go Back
            </Button>

            <Button
              onClick={async () => {
                await updateMatchResponseMutation.mutateAsync({
                  matchId: match.data?.matchId || 0,
                  status: "ACCEPTED",
                });
                await match.refetch();
                setIsAcceptanceModalOpened(false);
              }}
              className="font-semibold rounded-lg  border-primary bg-green-500 py-3"
              isDisabled={
                updateMatchResponseMutation.isPending || match.isLoading
              }
              isLoading={updateMatchResponseMutation.isPending}
            >
              Accept
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        title="Confirm Match Rejection"
        titleClassName="!text-2xl"
        className=""
        isOpen={isRejectionModalOpened}
        onClose={() => setIsRejectionModalOpened(false)}
      >
        <form className="flex flex-col items-center justify-center w-[30rem]">
          <h2 className="text-center text-title text-2xl font-bryantProMedium mt-7">
            Are you sure you want to reject
            <span className="text-title"> {match.data?.firstName}</span> as your
            match?
          </h2>

          <div className="mt-10 w-full text-left space-y-5">
            <div className="space-y-4">
              <label htmlFor="">
                1. How physically attracted were you to your match?{" "}
              </label>
              <div className="flex">
                {Array.from({ length: 7 }).map((_, choice) => (
                  <Input
                    id="matchPhysicalAttraction"
                    key={choice}
                    label={choice}
                    type="radio"
                    variation="secondary"
                    className="flex flex-col items-center"
                    {...register("matchPhysicalAttraction", {
                      required: "This question is required",
                    })}
                    value={choice}
                  />
                ))}
              </div>
              {errors.matchPhysicalAttraction && (
                <p className="text-primary text-[0.8rem] mt-2">
                  {errors.matchPhysicalAttraction.message}
                </p>
              )}
            </div>

            <div className="space-y-4">
              <label htmlFor="">2. How good of a match was this?</label>
              <div className="flex">
                {Array.from({ length: 7 }).map((_, choice) => (
                  <Input
                    id="matchQuality"
                    key={choice}
                    label={choice}
                    type="radio"
                    variation="secondary"
                    className="flex flex-col items-center"
                    value={choice}
                    {...register("matchQuality", {
                      required: "This question is required",
                    })}
                  />
                ))}
              </div>
              {errors.matchQuality && (
                <p className="text-primary text-[0.8rem] mt-2">
                  {errors.matchQuality.message}
                </p>
              )}
            </div>

            <div className="space-y-4">
              <Input
                id="rejectionReason"
                className="w-full"
                label="Can you explain why you're saying no? It helps our matchmakers pick a better Pair for you next time!"
                variation="secondary"
                error={errors.rejectionReason}
                {...register("rejectionReason", {
                  required: "This question is required",
                })}
              />
            </div>
          </div>

          <div className="flex justify-center w-full mt-8 gap-2">
            <Button
              className="rounded-md"
              type="button"
              onClick={() => setIsRejectionModalOpened(false)}
              variant="outlined"
            >
              Go Back
            </Button>

            <Button
              className=" disabled:bg-slate-300 disabled:text-white disabled:border-slate-300 rounded-md"
              type="button"
              isDisabled={
                updateMatchResponseMutation.isPending || match.isLoading
              }
              isLoading={updateMatchResponseMutation.isPending}
              onClick={handleSubmit(async (data) => {
                await updateMatchResponseMutation.mutateAsync({
                  matchId: match.data?.matchId || 0,
                  status: "REJECTED",
                  matchQuality: Number(data.matchQuality),
                  physicalAttraction: Number(data.matchPhysicalAttraction),
                  rejectionReason: data.rejectionReason,
                });
                await match.refetch();
                setIsRejectionModalOpened(false);
              })}
            >
              Reject
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default MatchCard;
