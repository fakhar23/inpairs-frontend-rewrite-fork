"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ClipLoader } from "react-spinners";
import { BsFillTelephoneInboundFill, BsInstagram } from "react-icons/bs";
import { CloudinaryImage, Modal, Pooling } from "@/components";
import { COLORS } from "../../../tailwind.config";

enum MatchStatus {
  PENDING = "PENDEING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

const StatusComponent = ({ user, onAction }: any) => {
  const status = useMemo(() => {
    if (
      user?.response === MatchStatus.ACCEPTED &&
      user?.currentUserResponse === MatchStatus.ACCEPTED
    ) {
      return "matched";
    } else if (
      user?.currentUserResponse === MatchStatus.ACCEPTED &&
      user?.response === MatchStatus.PENDING
    ) {
      return "waiting";
    } else if (user?.currentUserResponse === MatchStatus.REJECTED) {
      return "rejecting";
    } else if (user?.response === MatchStatus.REJECTED) {
      return "rejected";
    } else if (user?.currentUserResponse === MatchStatus.PENDING) {
      return "pending";
    }
  }, [user]);

  if (status === "matched") {
    return (
      <div className="gap-4 items-center text-black900">
        <h3 className="text-[20px] font-semibold tracking-[0.6px] capitalize md:text-[16px]">
          Congrats! Your match is here
        </h3>
        <div className="flex items-center gap-4  text-black900">
          <div className="flex items-center gap-1">
            <BsFillTelephoneInboundFill /> {user?.phone_number}
          </div>
          <div className="border-[0.4px] border-purple900 h-[1.25rem] inline" />

          <div className="flex items-center gap-1">
            <BsInstagram />
            {user?.instagram_handle}
          </div>
        </div>
      </div>
    );
  } else if (status == "waiting") {
    return (
      <div className="flex  gap-4 items-center text-black900">
        <h3 className="text-[20px] font-semibold tracking-[0.6px] capitalize md:text-[16px]">
          Waiting for match decision
        </h3>
      </div>
    );
  } else if (status == "rejected") {
    return (
      <div className="flex  gap-4 items-center text-black900">
        <h3 className="text-[20px] font-semibold tracking-[0.6px] capitalize md:text-[16px]">
          You have been rejected :(
        </h3>
      </div>
    );
  } else if (status == "rejecting") {
    return (
      <div className="flex  gap-4 items-center text-black900">
        <h3 className="text-[20px] font-semibold tracking-[0.6px] capitalize md:text-[16px]">
          You have already rejected this match
        </h3>
      </div>
    );
  } else if (status == "pending") {
    return (
      <div className="flex  gap-10 w-full">
        <span
          onClick={() => onAction("accept")}
          className="text-green500 cursor-pointer hover:text-green300 transition-all ease-out duration-300"
        >
          Accept
        </span>
        <span
          onClick={() => onAction("reject")}
          className="text-red cursor-pointer hover:text-red300 transition-all ease-out duration-300"
        >
          Decline
        </span>
      </div>
    );
  }
};

const MatchCard = ({ user }: any) => {
  const [action, setAction] = useState("");
  const [survey, setSurvey]: any = useState(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const isLoading = false;

  const handleUpdateMatchHistory = async (key: "match" | "profile") => {};

  const onClose = () => {
    setAction("");
    setSurvey(null);
    setIsOpen((isOpen) => !isOpen);
  };

  const handleConfirm = async () => {};

  const onSurveyChange = (e: any) => {
    const { name, value } = e.target;
    setSurvey({ ...survey, [name]: value });
  };

  const handleClick = (action: string) => {
    setAction(action);
    setIsOpen(true);
  };

  const isDisabled =
    isLoading || !survey?.question1 || !survey?.question1 || !survey?.reason;

  return (
    <>
      <div className="w-full h-[132px] flex justify-between items-center ml-16 md:ml-4 my-7 ms:flex-col ms:h-auto ms:gap-3">
        <div className="flex items-center gap-5 md:gap-2 ms:flex-col">
          <CloudinaryImage
            url={user?.image}
            fallback="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMx1itTXTXLB8p4ALTTL8mUPa9TFN_m9h5VQ&usqp=CAU"
            alt={`${user?.name} image`}
            width={132}
            height={132}
            className="rounded-lg h-[132px] w-[132px] object-cover md:h-[100px] md:w-[100px] ms:w-full ms:h-[200px]  ms:min-w-[300px] "
          />

          <div className="flex flex-col py-2 gap-10 md:gap-8 ms:w-full">
            <div className="flex gap-20 xl:gap-8 ld:gap-20 md:gap-4 ms:gap-0 ms:justify-between">
              <div className="flex flex-col justify-between whitespace-nowrap">
                <h3 className="text-[20px] font-semibold tracking-[0.6px] capitalize md:text-[16px]">
                  {user?.firstName}
                </h3>

                <div className="flex gap-4 items-center text-black900">
                  <span>{user?.age} years</span>
                  <div className="border-[0.4px] border-purple900 h-[1.25rem] inline" />
                </div>
              </div>

              <Link
                onClick={() => handleUpdateMatchHistory("profile")}
                href="/profile/"
                className="flex items-center whitespace-nowrap bg-purple900 text-white px-[2rem] h-[42px] rounded-3xl text-[1rem] focus:outline-none focus:shadow-outline hover:bg-purple500 transition-all ease-out duration-300  md:h-[36px] md:text-[14px]  "
              >
                View Profile
              </Link>
            </div>

            <StatusComponent user={user} onAction={handleClick} />
          </div>
        </div>

        <div className="h-full flex justify-center items-center mr-12 ld:flex ld:mr-5 md:mr-3 ">
          {/* <CountdownTimer targetDate={'2023-10-04T01:00:00'} /> */}
        </div>
      </div>

      <Modal
        title="Accepted Confirmation Message"
        titleClassName="!text-2xl"
        className=""
        isOpen={isOpen && action === "accept"}
        onClose={onClose}
      >
        <div className="flex flex-col items-center justify-center w-[30rem]">
          <h2 className="text-center text-secondary text-2xl font-bryantProMedium mt-7">
            Are you sure you want to accept
            <span className="text-purple"> {user?.name}</span> as your match?
          </h2>

          <div className="flex justify-center w-full mt-8">
            <button
              onClick={onClose}
              className="bg-white text-secondary font-semibold w-5/12 py-5 rounded-lg mr-4 border-primaryColor border border-solid"
            >
              Go Back
            </button>

            <button
              onClick={handleConfirm}
              className={`capitalize text-white font-semibold w-5/12 py-2 rounded-lg flex items-center justify-center gap-5
               bg-green500 `}
            >
              {isLoading && (
                <ClipLoader
                  color={COLORS.primaryColor}
                  size={20}
                  aria-label="Loading..."
                />
              )}
              Accept
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        title="Rejected Confirmation Message"
        titleClassName="!text-2xl"
        className=""
        isOpen={isOpen && action === "reject"}
        onClose={onClose}
      >
        <div className="flex flex-col items-center justify-center w-[30rem]">
          <h2 className="text-center text-secondary text-2xl font-bryantProMedium mt-7">
            Are you sure you want to reject
            <span className="text-purple"> {user?.name}</span> as your match?
          </h2>

          <div className="mt-10 w-full text-left space-y-5">
            <div className="space-y-4">
              <label htmlFor="">
                1. How physically attracted were you to your match?{" "}
              </label>

              <Pooling count={7} name="question1" onChange={onSurveyChange} />
            </div>

            <div className="space-y-4">
              <label htmlFor="">2. How good of a match was this?</label>
              <Pooling count={7} name="question2" onChange={onSurveyChange} />
            </div>

            {survey?.question1 && survey?.question2 && (
              <div className="space-y-4">
                <label htmlFor="">
                  Can you explain why you&apos;re saying no? It helps our
                  matchmakers pick a better Pair for you next time!
                </label>

                <input
                  name="reason"
                  className="w-full bg-semiTransparentLightGray
                   rounded-[10px] px-3 border-slate400 leading-tight h-[3rem]   text-gray-charcoal focus:outline-primaryColor"
                  placeholder=""
                  onChange={onSurveyChange}
                />
              </div>
            )}
          </div>

          <div className="flex justify-center w-full mt-8">
            <button
              onClick={onClose}
              className="bg-white text-secondary font-semibold w-5/12 py-5 rounded-lg mr-4 border-primaryColor border border-solid"
            >
              Go Back
            </button>

            <button
              disabled={isDisabled}
              onClick={handleConfirm}
              className={`capitalize text-white font-semibold w-5/12 py-2 rounded-lg flex items-center justify-center gap-5
              ${isDisabled ? "bg-neutral500" : "bg-red500"} `}
            >
              {isLoading && (
                <ClipLoader
                  color={COLORS.primaryColor}
                  size={20}
                  aria-label="Loading..."
                />
              )}{" "}
              Reject
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MatchCard;
